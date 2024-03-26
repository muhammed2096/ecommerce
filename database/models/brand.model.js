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
    logo:String,
    slug:{
        type:String,
        required:true,
        lowercase:true
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
const brandModel = mongoose.model("Brand", schema);
export default brandModel 