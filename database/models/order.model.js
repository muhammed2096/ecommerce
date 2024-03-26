import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    orderItems:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number,
    }],
    totalOrderPrice:Number,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentType:{
        type:String,
        enum:['cash', 'card'],
        default:'cash'
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,

},{
    timestamps:true
})

const orderModel = mongoose.model("order", schema);
export default orderModel 



// ecommerce
// YfSK667tdBQXTLbu