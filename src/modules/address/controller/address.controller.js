

import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import userModel from "../../../../database/models/user.model.js";



const addAddress = handleAsyncError(async (req, res)=>{
    let address = await userModel.findOneAndUpdate(req.user._id, {$addToSet:{addresses:req.body}}, {new:true})
    address && res.json({message:"Success", address:address.addresses})
    !address && next(new appError("address not found ! :(", 401))   
}
)

const removeAddress = handleAsyncError(async (req, res)=>{
    let address = await userModel.findOneAndUpdate(req.user._id, {$pull:{addresses:{_id:req.params.id}}}, {new:true})
    address && res.json({message:"Success", address:address.addresses})
    !address && next(new appError("address not found ! :(", 401))   
}
)
const getLoggedUserAddress = handleAsyncError(async (req, res)=>{
    let {addresses} = await userModel.findById(req.user._id)
    addresses && res.json({message:"Success", addresses})
    !addresses && next(new appError("address not found ! :(", 401))   
}
)


export {
addAddress,
removeAddress,
getLoggedUserAddress
}