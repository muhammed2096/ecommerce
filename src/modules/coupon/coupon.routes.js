import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addCoupon, deleteCoupon, getAllCoupon, getSingleCoupon, updateCoupon } from './controller/coupon.controller.js'
import { addCouponValidation, paramValidation, updateCouponValidation } from './controller/coupon.validator.js'


const couponRouter = express.Router()
couponRouter.use(protectedRoutes, allowedTo('admin'))
couponRouter
    .route('/')
    .post(validation(addCouponValidation), addCoupon)
    .get(getAllCoupon)

couponRouter.route('/:id')
    .get(validation(paramValidation), getSingleCoupon)
    .put(validation(updateCouponValidation), updateCoupon)
    .delete(validation(paramValidation), deleteCoupon)
export default couponRouter