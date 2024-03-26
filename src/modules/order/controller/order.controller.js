import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { deleteOne } from "../../handler/apiHandler.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";
import cartModel from "../../../../database/models/cart.model.js";
import productModel from "../../../../database/models/product.model.js";
import orderModel from "../../../../database/models/order.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_sk_test_51OyLjB06k8V6miqkOwgi5UmAKs0xuFYClm4oN3pzOoOp9aOW8HNkk2JxjQu3qEiJ8AKslsWHY8QFMHpBLXjdG9aq00fLwb2UKS');


const createCashOrder = handleAsyncError(async (req, res, next)=>{
     
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new appError("you don't have a cart to order :(", 404))
    let totalOrderPrice = cart.totalPriceAfterDiscound?cart.totalPriceAfterDiscound:cart.totalPrice
    let order = new orderModel({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options = cart.cartItems.map((prod)=>{
        return (
            { updateOne : {
                "filter" : { _id : prod.product }, 
                "update" : { $inc : { sold:prod.quantity, quantity:-prod.quantity } }
             } }
        )
    })
    productModel.bulkWrite(options); 
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:'success', order})
})

const getSpecificOrder = handleAsyncError(async (req, res, next)=>{
    let order = await orderModel.findOne({user:req.user._id}).populate('cartItems.product')
    res.json({message:"success", order})
})

const getAllOrders = handleAsyncError(async (req, res, next)=>{
    let orders = await orderModel.find().populate('cartItems.product')
    res.json({message:"success", orders})
})
const createCheckOutSession = handleAsyncError(async (req, res, next)=>{
    let cart = await cartModel.findById(req.params.id)
    let totalOrderPrice = cart.totalPriceAfterDiscound?cart.totalPriceAfterDiscound:cart.totalPrice
    let session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:'egp',
                unit_amount:totalOrderPrice * 100,
                product_data:{
                    name:req.user.name
                },
                quantity:1
            }
        }],
        mode:'payment',
        success_url:'https://route-comm.netlify.app/#/',
        cancel_url:'https://route-comm.netlify.app/#/cart',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.json({message:"success", session})
})
export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckOutSession
}