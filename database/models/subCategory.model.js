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
    image:String,
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})
schema.post("init", function(doc){
    doc.image = process.env.BASE_URL +"uploads/"+ doc.image
})
schema.pre('find', function(){
    this.populate('category')
})
const subCategoryModel = mongoose.model("SubCategory", schema);
export default subCategoryModel