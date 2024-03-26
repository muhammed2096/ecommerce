import mongoose from "mongoose";

export const dbConnection =()=> {
    mongoose.connect('mongodb+srv://ecommerce:Hr4z9nwaJ4JZrdnx@cluster0.fyuxlnp.mongodb.net/ecommerceDB')
    .then(()=>{console.log("DB is Connected");})
    .catch((err)=>{console.log(err);})
} 