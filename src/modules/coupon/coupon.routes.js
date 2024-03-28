import express from "express"
import { validation } from "../../middleware/validation.js"
import { addCoupon, deleteCoupon, getAllCoupon, getCouponById, updateCoupon } from "./controller/coupon.controller.js"
import { addCouoponSchema, deleteCouponSchema, getCouponByIdSchema, updateCouponSchema } from "./controller/coupon.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const couponRoutes = express.Router()

couponRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"), validation(addCouoponSchema), addCoupon)
    .get(protectedRoutes, allowedTo("admin"), getAllCoupon)

    couponRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("admin"), validation(getCouponByIdSchema), getCouponById)
    .patch(protectedRoutes, allowedTo("admin"), validation(updateCouponSchema), updateCoupon)
    .delete(protectedRoutes, allowedTo("admin"), validation(deleteCouponSchema), deleteCoupon)    

export default couponRoutes