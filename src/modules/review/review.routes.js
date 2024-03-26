import express from "express"
import { validation } from "../../middleware/validation.js"
import { addReview, deleteReview, getAllReview, getAllReviewById, updateReview } from "./controller/review.controller.js"
import { addReviewSchema, deleteReviewSchema, getReviewByIdSchema, updateReviewSchema } from "./controller/review.validator.js"


const reviewRoutes = express.Router()

reviewRoutes.route("/")
    .post(validation(addReviewSchema), addReview)
    .get(getAllReview)

    reviewRoutes.route("/:id")
    .get(validation(getReviewByIdSchema), getAllReviewById)
    .patch(validation(updateReviewSchema), updateReview)
    .delete(validation(deleteReviewSchema), deleteReview)    

export default reviewRoutes