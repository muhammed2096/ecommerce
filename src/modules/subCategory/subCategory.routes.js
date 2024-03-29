import express from 'express'

import {validation} from './../../middleware/validation.js'
import { uploadsingleFile } from '../../utilties/fileUpload.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addSubCategory, deleteSubCategory, getAllSubCategory, getSingleSubCategory, updateSubCategory } from './controller/subCategory.controller.js'
import { addSubCategoryValidation, paramValidation, updateSubCategoryValidation } from './controller/subCategory.validator.js'



const subCategoryRouter= express.Router({mergeParams:true})

subCategoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),uploadsingleFile('img'),validation(addSubCategoryValidation),addSubCategory)
.get(getAllSubCategory)

subCategoryRouter
.route('/:id')
.get(validation(paramValidation),getSingleSubCategory)
.put(protectedRoutes,allowedTo('admin'),validation(updateSubCategoryValidation),updateSubCategory)
.delete(protectedRoutes,allowedTo('admin'),validation(paramValidation),deleteSubCategory)
export default subCategoryRouter