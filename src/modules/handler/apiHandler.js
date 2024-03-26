import { handleAsyncError } from "../../middleware/handleAsyncError.js"



export const deleteOne = (model)=>{
    return handleAsyncError(async (req, res)=>{
        let deleted = await model.findByIdAndDelete(req.params.id)
        deleted && res.json({message:"Success", deleted})
        !deleted && next(new appError("SubCategory not found ! :(", 401))   
    })
}