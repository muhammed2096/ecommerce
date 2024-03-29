import express from 'express'
import { validation } from '../../middleware/validation.js'



import { isVerify } from '../../middleware/isVerify.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addTOCart, applayCoupon, clearUSerCart, getLoggedUSerCart, removeItemFromCart, updatequantity } from './controller/cart.controller.js'
import { addToCartVal, applayCouponVal, paramValidation, updatequantityVal } from './controller/cart.validator.js'


const cartRouter = express.Router()

cartRouter
    .route('/')
    .post(protectedRoutes,  isVerify,validation(addToCartVal), allowedTo('user'), addTOCart)
    .get(protectedRoutes,  isVerify,allowedTo('user'), getLoggedUSerCart)
    .delete(protectedRoutes, isVerify, allowedTo('user'), clearUSerCart)

cartRouter.post('/applayCoupon',protectedRoutes, isVerify, validation(applayCouponVal),  allowedTo('user'), applayCoupon)

cartRouter
    .route('/:id')
    .delete(protectedRoutes, isVerify, validation(paramValidation), allowedTo('user', 'admin'), removeItemFromCart)
    .put(protectedRoutes,  isVerify,validation(updatequantityVal), allowedTo('user'), updatequantity)

export default cartRouter