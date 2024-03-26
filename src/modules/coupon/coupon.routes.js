import express from "express"
import { validation } from "../../middleware/validation.js"
import { addCoupon, deleteCoupon, getAllCoupon, getAllCouponById, updateCoupon } from "./controller/coupon.controller.js"
import { addCouoponSchema, deleteCouponSchema, getCouponByIdSchema, updateCouponSchema } from "./controller/coupon.validator.js"


const couponRoutes = express.Router()

couponRoutes.route("/")
    .post(validation(addCouoponSchema), addCoupon)
    .get(getAllCoupon)

    couponRoutes.route("/:id")
    .get(validation(getCouponByIdSchema), getAllCouponById)
    .patch(validation(updateCouponSchema), updateCoupon)
    .delete(validation(deleteCouponSchema), deleteCoupon)    

export default couponRoutes