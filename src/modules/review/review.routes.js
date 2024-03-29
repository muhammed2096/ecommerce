import express from 'express'
import { validation } from '../../middleware/validation.js'

import { isVerify } from '../../middleware/isVerify.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addReview, deleteReview, getAllreview, getSinglereview, updateReview } from './controller/review.controller.js'
import { addReviewValidation, paramValidation, updateReviewValidation } from './controller/review.validator.js'

const reviewRouter = express.Router()

reviewRouter
    .route('/')
    .post(protectedRoutes, isVerify, validation(addReviewValidation), allowedTo('user'), addReview)
    .get(getAllreview)


reviewRouter.route('/:id')
    .get(getSinglereview)
    .put(protectedRoutes,  isVerify,validation(updateReviewValidation), allowedTo('user'), updateReview)
    .delete(protectedRoutes,  isVerify,validation(paramValidation), allowedTo('user', 'admin'), deleteReview)


export default reviewRouter