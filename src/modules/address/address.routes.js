import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addAddress, getLoggedAddress, removeAddress } from './controller/address.controller.js'
import { isVerify } from '../../middleware/isVerify.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addAddressVal, paramValidation } from './controller/address.validator.js'


const addressRouter = express.Router()

addressRouter
    .route('/')
    .patch(protectedRoutes, isVerify, validation(addAddressVal), allowedTo('user'), addAddress)
    .get(protectedRoutes, isVerify, allowedTo('user'), getLoggedAddress)

addressRouter
    .route('/:id')
    .delete(protectedRoutes,  isVerify,validation(paramValidation), allowedTo('user'), removeAddress)


export default addressRouter