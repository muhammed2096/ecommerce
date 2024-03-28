import userModel from "../../database/models/user.model.js";
import { appError } from "../utilties/appError.js";
import { handleAsyncError } from "./handleAsyncError.js";


export const checkEmail = handleAsyncError(async (req, res, next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return next(new appError('Email is already exist', 409))
    next()
})

 