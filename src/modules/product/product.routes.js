import express from 'express'

import { validation } from '../../middleware/validation.js'

import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from './controller/product.controller.js'
import { addProductValidation, paramValidation, updateProductValidation } from './controller/product.validator.js'
import { uploadFields } from '../../utilties/fileUpload.js'


const productRouter = express.Router()

productRouter
    .route('/')
    .post(protectedRoutes, allowedTo('admin'), uploadFields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]), validation(addProductValidation), addProduct)
    .get(getAllProduct)

productRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleProduct)
    .put(protectedRoutes, allowedTo('admin'), uploadFields([
        { name: 'imageCover', maxCount: 1 }
    ]), validation(updateProductValidation), updateProduct)
    .delete(protectedRoutes, allowedTo('admin'), validation(paramValidation), deleteProduct)
export default productRouter