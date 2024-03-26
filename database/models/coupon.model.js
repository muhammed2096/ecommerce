import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    discount:{
        type:Number,
        min:0,

    },
    expires:{
        type:Date
    }
},{
    timestamps:true
})

const couponModel = mongoose.model("Coupon", schema);
export default couponModel