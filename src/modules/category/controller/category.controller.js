import categoryModel from "../../../../database/models/category.model.js";
import slugify from "slugify";
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { deleteOne } from "../../handler/apiHandler.js";




const addCategory = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.image = req.file.filename
    let preCategory = new categoryModel(req.body);
    let addedCategory = await preCategory.save()
    res.json({message:"Success", addedCategory})
})

const getAllCategories = handleAsyncError(async (req, res)=>{
    let allCategories = await categoryModel.find();
    res.json({message:"Success", allCategories})
})

const getAllCategoryById = handleAsyncError(async (req, res)=>{
    let category = await categoryModel.findById(req.params.id);
    res.json({message:"Success", category})
})

const updateCategory = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    if(req.file) req.body.image = req.file.filename
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    updatedCategory && res.json({message:"Success", updatedCategory})
    !updatedCategory && next(new appError("Category not found ! :(", 401))   
}
)

const deleteCategory = deleteOne(categoryModel)

export {
    addCategory,
    getAllCategories,
    getAllCategoryById,
    updateCategory,
    deleteCategory 
}