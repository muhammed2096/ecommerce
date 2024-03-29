
import { userModel } from "../../database/models/user.model.js";
import { appError } from "../utilties/appError.js";
import { catchError } from "./catchError.js";

export const isVerify = catchError(async(req,res,next)=>{
    let user = await userModel.findById(req.user._id)
    if(user.isverify){
        next()
    }else{
        next(new appError('Email is not verified'))
    }
})