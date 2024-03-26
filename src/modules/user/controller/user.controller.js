import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { deleteOne } from "../../handler/apiHandler.js";
import userModel from "../../../../database/models/user.model.js";





const addUser = handleAsyncError(async (req, res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return next(new appError("Email is already exist :(", 409))
    let preUser = new userModel(req.body);
    let added = await preUser.save()
    res.json({message:"Success", added})
})

const getAllUsers = handleAsyncError(async (req, res)=>{
    let allUsers = await userModel.find();
    res.json({message:"Success", allUsers})
})

const getAllUserById = handleAsyncError(async (req, res)=>{
    let user = await userModel.findById(req.params.id);
    res.json({message:"Success", user})
})

const updateUser = handleAsyncError(async (req, res)=>{
    let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    updatedUser && res.json({message:"Success", updatedUser})
    !updatedUser && next(new appError("User not found ! :(", 401))   
}
)
const changePassword = handleAsyncError(async (req, res)=>{
    let {id} = req.params
    req.body.changePasswordAt = Date.now()
    let updatedUser = await userModel.findOneAndUpdate({_id:id}, req.body, {new:true})
    updatedUser && res.json({message:"Success", updatedUser})
    !updatedUser && next(new appError("User not found ! :(", 401))   
}
)

const deleteUser = deleteOne(userModel)

export {
    addUser,
    getAllUsers,
    getAllUserById,
    updateUser,
    deleteUser,
    changePassword
}