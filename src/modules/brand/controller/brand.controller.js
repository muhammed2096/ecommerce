
import slugify from "slugify";
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import brandModel from "../../../../database/models/brand.model.js";
import { deleteOne } from "../../handler/apiHandler.js";





const addBrand = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.logo = req.file.filename
    let preBrand = new brandModel(req.body);
    let added = await preBrand.save()
    res.json({message:"Success", added})
})

const getAllBrands = handleAsyncError(async (req, res)=>{
    let allBrands = await brandModel.find();
    res.json({message:"Success", allBrands})
})

const getAllBrandById = handleAsyncError(async (req, res)=>{
    let brand = await brandModel.findById(req.params.id);
    res.json({message:"Success", brand})
})

const updateBrand = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.logo = req.file.filename
    let updatedBrand = await brandModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    updatedBrand && res.json({message:"Success", updatedBrand})
    !updatedBrand && next(new appError("Brand not found ! :(", 401))   
}
)

const deleteBrand = deleteOne(brandModel)

export {
    addBrand,
    getAllBrands,
    getAllBrandById,
    updateBrand,
    deleteBrand 
}