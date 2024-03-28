import userModel from "../../database/models/user.model.js";
import { appError } from "../utilties/appError.js";
import { handleAsyncError } from "./handleAsyncError.js";


export const checkEmail = handleAsyncError(async (req, res, next)=>{
    let {email} = req.body
    let checkEmail = await userModel.findOne({email})
    if(checkEmail) return next(new appError('Email already Exist',409))
    next()
})

 