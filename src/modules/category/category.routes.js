import express from 'express'
import { validation } from './../../middleware/validation.js'
import { addCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from './controller/category.controller.js'
import { addCategoryValidation, paramValidation, updateCategoryValidation } from './controller/category.validator.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import subCategoryRouter from '../subCategory/subCategory.routes.js'
import { uploadsingleFile } from '../../utilties/fileUpload.js'
const categoryRouter = express.Router()
categoryRouter.use('/:category/subCategory', subCategoryRouter)
categoryRouter
    .route('/')
    .post(protectedRoutes, allowedTo('admin'), uploadsingleFile('imageCover'), validation(addCategoryValidation), addCategory)
    .get(getAllCategory)
categoryRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleCategory)
    .put(protectedRoutes, allowedTo('admin'), uploadsingleFile('imageCover'), validation(updateCategoryValidation), updateCategory)
    .delete(protectedRoutes, allowedTo('admin'), validation(paramValidation), deleteCategory)
export default categoryRouter