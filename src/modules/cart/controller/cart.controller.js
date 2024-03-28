import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";
import cartModel from "../../../../database/models/cart.model.js";
import productModel from "../../../../database/models/product.model.js";
import couponModel from "../../../../database/models/coupon.model.js";


function calcPrice(cart){
    let totalPrice = 0;
    cart.cartItems.forEach((ele)=>{
        totalPrice += ele.quantity * ele.price 
    })
    cart.totalPrice = totalPrice;
}

const addNewCart = handleAsyncError(async (req, res, next)=>{
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new appError('product not found', 404))
    req.body.price = product.price 
    let cartExist = await cartModel.findOne({user:req.user._id})
    if(!cartExist){
        let preCart = new cartModel({
            user:req.user._id,
            cartItems:[req.body],
        });
        calcPrice(cart)
        let addedCart = await preCart.save()
        res.json({message:"Success", addedCart})
    }
    let item = cartExist.cartItems.find((ele)=>ele.product == req.body.product)
    if(item){
        item.quantity += 1 
    }else{
        cartExist.cartItems.push(req.body)
    }
    calcPrice(cartExist)
    await cartExist.save()
        next(new appError('you have already a cart :)'))
    
})
const applyCoupon = handleAsyncError(async (req,res,next)=>{
    let coupon = await couponModel.findOne({
        code:req.body.coupon,
        expires:{$gte:Date.now()}
    })
    if(!coupon) return next(new appError("invalid coupon", 401));
    let cart = await cartModel.findOne({user:req.user._id});
    if(!cart) return next(new appError("invalid cart", 401))
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save()
    res.json({message:"success", cart})
})

const getCart = handleAsyncError(async (req, res, next)=>{
    let features = new apiFeatures(cartModel.findOne({user:req.user._id}), req.query).pagination().filter().sort().fields().keyword()
    let allCart = await features.mongooseQuery
    res.json({message:"Success",page:features.pageNumber, allCart})
})

const removeCartItem = handleAsyncError(async (req, res, next)=>{
    let cart = await cartModel.findOneAndUpdate({user:req.user._id}, {$pull:{cartItems:{_id:req.params.id}}}, {new:true})
    res.json({message:"deleted", cart})
})

const clearUserCart = handleAsyncError(async (req, res, next)=>{
    let cart = await cartModel.findOneAndDelete({user:req.user._id})
    cart && res.json({message:"success", cart});
    !cart && next(new appError("cart not found", 404))
})

const updateQuantity = handleAsyncError(async (req, res, next)=>{
    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new appError('product not found', 404))
    req.body.price = product.price 
    let cartExist = await cartModel.findOne({user:req.user._id})

    let item = cartExist.cartItems.find((ele)=>ele.product == req.body.product)
    !item && next(new appError("Not Found :(", 404))
    if(item){
        item.quantity = req.body.quantity 
    }
    calcPrice(cartExist)
    await cartExist.save()
        next(new appError('you have already a cart :)'))
}
)



export {
    addNewCart,
    getCart,
    removeCartItem,
    updateQuantity,
    applyCoupon,
    clearUserCart
}