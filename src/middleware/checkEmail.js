import userModel from "../../database/models/user.model.js";
import { appError } from "../utilties/appError.js";
import { handleAsyncError } from "./handleAsyncError.js";
import bcrypt from 'bcrypt'


export const checkEmail = handleAsyncError(async (req, res, next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) next(new appError('user already exist', 409))
    req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS))
    next()
})