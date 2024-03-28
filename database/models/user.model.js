// import mongoose from "mongoose";
// import bcrypt from "bcrypt"

// const schema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         // unique:true,
//         trim:true
//     },
//     phone:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enums:["admin", "user"],
//         default:"user"  
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     isActive:{
//         type:Boolean,
//         default:true,
//     },
//     isBlocked:{
//         type:Boolean,
//         default:false
//     },
//     isVerfied:{
//         type:Boolean,
//         default:false
//     },
//     changePasswordAt:Date,
//     wishlist:[{type:mongoose.Types.ObjectId, ref:'Product'}],
//     addresses:[{
//         street:String,
//         phone:String,
//         city:String
//     }]
// },{
//     timestamps:true
// })

// schema.pre("save", function(){
//     console.log(this);
//     if(this.password) this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT_ROUNDS))
// })

// schema.pre("findOneAndUpdate", function(){
//     console.log(this);
//    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password, parseInt(process.env.SALT_ROUNDS))
// })


// const userModel = mongoose.model("User", schema);
// export default userModel

import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,'name is too short'],
        maxLength:[20,'name is too long']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        lowercase : true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    passwordChangedAt : Date,
    wishList : [{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    address : [{
        streat:String,
        phone:String,
        city:String
    }],
    verifyCode: {
        type: String,
    },
    resetCode: String,
    passwordChangedAT: Date,
    isverify: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    }
},{ timestamps: true })


schema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate', function () {
    if (this._update.password)
        this._update.password = bcrypt.hashSync(this._update.password, 8)
})

const userModel = mongoose.model("User", schema);
export default userModel