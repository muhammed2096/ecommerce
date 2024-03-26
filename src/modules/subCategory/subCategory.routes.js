import express from "express"
import { addSubCategory, deleteSubCategory, getAllSubCategories, getAllSubCategoryById, updateSubCategory } from "./controller/subCategory.controller.js"
import { validation } from "../../middleware/validation.js"
import { addSubCategorySchema, deleteSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from "./controller/subCategory.validator.js"
import { uploadSingle } from "../../utilties/fileUpload.js"

const subCategoryRoutes = express.Router({mergeParams:true})

subCategoryRoutes.route("/")
    .post(uploadSingle('image'), validation(addSubCategorySchema), addSubCategory)
    .get(getAllSubCategories)

    subCategoryRoutes.route("/:id")
    .get(validation(getSubCategoryByIdSchema), getAllSubCategoryById)
    .patch(validation(updateSubCategorySchema), updateSubCategory)
    .delete(validation(deleteSubCategorySchema), deleteSubCategory)    

export default subCategoryRoutes