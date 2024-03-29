import express from 'express'

import { validation } from '../../middleware/validation.js'

import { addBrand, deleteBrand, getAllBrand, getSingleBrand, updateBrand } from './controller/brand.controller.js'
import { addBrandValidation, paramValidation, updateBrandValidation } from './controller/brand.validator.js'
import { uploadsingleFile } from '../../utilties/fileUpload.js'

const brandRouter = express.Router()

brandRouter
    .route('/')
    .post(uploadsingleFile('imageCover'), validation(addBrandValidation), addBrand)
    .get(getAllBrand)

brandRouter
    .route('/:id')
    .get(validation(paramValidation), getSingleBrand)
    .put(uploadsingleFile('imageCover'), validation(updateBrandValidation), updateBrand)
    .delete(validation(paramValidation), deleteBrand)
export default brandRouter