import { appError } from "../utilties/appError.js"


export const validation = (schema) => {
    return (req, res, next) => {
        let filter = {};
        if(req.file){
            filter = {image:req.file, ...req.params,...req.body,...req.query}
        }else if(req.files){
            filter = {...req.files, ...req.params, ...req.body, ...req.query}
        }else{
            filter = {...req.params,...req.body,...req.query}
        }
        const { error } = schema.validate(filter, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errorList = []
            error.details.forEach((ele)=>{
                errorList.push(ele.message)
            })
            next(new appError(errorList, 401))
        
        }
    } 
}
