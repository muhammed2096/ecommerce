import express from 'express'
import { validation } from '../../middleware/validation.js'
import { isVerify } from '../../middleware/isVerify.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addToWishList, getLoggedWishList, removeFromWishList } from './controller/wishList.controller.js'
import { addWishListVal, paramValidation } from './controller/wishList.validator.js'

const wishListRouter = express.Router()

wishListRouter
    .route('/')
    .patch(protectedRoutes, isVerify, validation(addWishListVal), allowedTo('user'), addToWishList)
    .get(protectedRoutes,  isVerify,allowedTo('user'), getLoggedWishList)


wishListRouter
    .route('/:id')
    .delete(protectedRoutes, isVerify, allowedTo('user'), validation(paramValidation), removeFromWishList)

export default wishListRouter