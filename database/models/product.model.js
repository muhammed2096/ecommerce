import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[3, "title is too short!"],
        maxLength:[30, "title is too long"],
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        minLength:[3, "description is too short!"],
        maxLength:[300, "description is too long"],
        required:true,
    },
    price:{
        type:Number,
        min:0,
        required:true   
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true   
    },
    imageCover:String,
    images:[String],
    sold:{
        type:Number,
        default:0,
        required:true   
    },
    quantity:{
        type:Number,
        default:0,
        required:true   
    },
    rateCount:{
        type:Number   
    },
    rateAverage:{
        type:Number,
        min:0,
        max:5   
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategory"
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
    toJSON:{virtuals:true}
})
schema.post("init", function(doc){
    if(doc.imageCover||doc.images){
        doc.imageCover = process.env.BASE_URL +"uploads/"+ doc.imageCover,
        doc.images = doc.images?.map(ele => process.env.BASE_URL +"uploads/"+ ele)
    }
        
})

schema.virtual('myReviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'product'
})

schema.pre('findOne', function(){
    this.populate('myReviews')
})
const productModel = mongoose.model("Product", schema);
export default productModel