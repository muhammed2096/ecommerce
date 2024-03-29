import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utilties/appError.js"



export const deleteOne = (model)=>{
    return catchError(async(req,res,next)=>{
        const doc = await model.findByIdAndDelete(req.params.id)
        !doc && next(new appError('doc not found',404))
        doc && res.send({msg: 'success'})
    })
    
}