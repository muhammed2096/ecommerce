import express from "express"
import { validation } from "../../middleware/validation.js"
import { addReview, deleteReview, getAllReview, getAllReviewById, updateReview } from "./controller/review.controller.js"
import { addReviewSchema, deleteReviewSchema, getReviewByIdSchema, updateReviewSchema } from "./controller/review.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const reviewRoutes = express.Router()

reviewRoutes.route("/")
    .post(protectedRoutes, allowedTo("user"),validation(addReviewSchema), addReview)
    .get(getAllReview)

    reviewRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("user"),validation(getReviewByIdSchema), getAllReviewById)
    .patch(protectedRoutes, allowedTo("user"),validation(updateReviewSchema), updateReview)
    .delete(protectedRoutes, allowedTo("user"),validation(deleteReviewSchema), deleteReview)    

export default reviewRoutes