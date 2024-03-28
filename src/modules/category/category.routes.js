import express from "express"
import { addCategory, deleteCategory, getAllCategories, getAllCategoryById, updateCategory } from "./controller/category.controller.js"
import { validation } from "../../middleware/validation.js"
import { addCategorySchema, deleteCategorySchema, getCategoryByIdSchema, updateCategorySchema } from "./controller/category.validator.js"
import { uploadSingle } from "../../utilties/fileUpload.js"
import subCategoryRoutes from "../subCategory/subCategory.routes.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"

const categoryRoutes = express.Router()
categoryRoutes.use("/:category/subCategory", subCategoryRoutes)
categoryRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"),uploadSingle('image'), validation(addCategorySchema), addCategory)
    .get(getAllCategories)

    categoryRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("admin"),validation(getCategoryByIdSchema), getAllCategoryById)
    .patch(protectedRoutes, allowedTo("admin"),validation(updateCategorySchema), updateCategory)
    .delete(protectedRoutes, allowedTo("admin"),validation(deleteCategorySchema), deleteCategory)    

export default categoryRoutes