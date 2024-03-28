import express from "express"
import { addSubCategory, deleteSubCategory, getAllSubCategories, getAllSubCategoryById, updateSubCategory } from "./controller/subCategory.controller.js"
import { validation } from "../../middleware/validation.js"
import { addSubCategorySchema, deleteSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from "./controller/subCategory.validator.js"
import { uploadSingle } from "../../utilties/fileUpload.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"

const subCategoryRoutes = express.Router({mergeParams:true})

subCategoryRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"),uploadSingle('image'), validation(addSubCategorySchema), addSubCategory)
    .get(getAllSubCategories)

    subCategoryRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("admin"),validation(getSubCategoryByIdSchema), getAllSubCategoryById)
    .patch(protectedRoutes, allowedTo("admin"),validation(updateSubCategorySchema), updateSubCategory)
    .delete(protectedRoutes, allowedTo("admin"),validation(deleteSubCategorySchema), deleteSubCategory)    

export default subCategoryRoutes