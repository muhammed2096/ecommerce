import express from "express"
import { addCategory, deleteCategory, getAllCategories, getAllCategoryById, updateCategory } from "./controller/category.controller.js"
import { validation } from "../../middleware/validation.js"
import { addCategorySchema, deleteCategorySchema, getCategoryByIdSchema, updateCategorySchema } from "./controller/category.validator.js"
import { uploadSingle } from "../../utilties/fileUpload.js"
import subCategoryRoutes from "../subCategory/subCategory.routes.js"

const categoryRoutes = express.Router()
categoryRoutes.use("/:category/subCategory", subCategoryRoutes)
categoryRoutes.route("/")
    .post(uploadSingle('image'), validation(addCategorySchema), addCategory)
    .get(getAllCategories)

    categoryRoutes.route("/:id")
    .get(validation(getCategoryByIdSchema), getAllCategoryById)
    .patch(validation(updateCategorySchema), updateCategory)
    .delete(validation(deleteCategorySchema), deleteCategory)    

export default categoryRoutes