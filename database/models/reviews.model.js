import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

schema.pre(/^find/, function(){
    this.populate('User', 'name')
})

const reviewModel = mongoose.model("Review", schema);
export default reviewModel