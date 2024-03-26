
import slugify from "slugify";
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import subCategoryModel from "../../../../database/models/subCategory.model.js";
import { deleteOne } from "../../handler/apiHandler.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";




const addSubCategory = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.image = req.file.filename
    let preSubCategory = new subCategoryModel(req.body);
    let addedSubCategory = await preSubCategory.save()
    res.json({message:"Success", addedSubCategory})
})

const getAllSubCategories = handleAsyncError(async (req, res)=>{
  
    let filterObj = {}
    if(req.params.category){
        filterObj.category = req.params.category
    }
    let features = new apiFeatures(subCategoryModel.find(filterObj), req.query).pagination().filter().sort().fields().keyword()
    let allSubCategories = await features.mongooseQuery
    res.json({message:"Success",page:features.pageNumber, allSubCategories})
})

const getAllSubCategoryById = handleAsyncError(async (req, res)=>{
    let subCategory = await subCategoryModel.findById(req.params.id);
    res.json({message:"Success", subCategory})
})

const updateSubCategory = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.image = req.file.filename
    let updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    updatedSubCategory && res.json({message:"Success", updatedSubCategory})
    !updatedSubCategory && next(new appError("SubCategory not found ! :(", 401))   
}
)

const deleteSubCategory = deleteOne(subCategoryModel)

export {
    addSubCategory,
    getAllSubCategories,
    getAllSubCategoryById,
    updateSubCategory,
    deleteSubCategory 
}