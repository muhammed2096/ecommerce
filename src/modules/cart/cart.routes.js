import express from "express"
import { validation } from "../../middleware/validation.js"
import { addNewCart, applyCoupon, clearUserCart, getCart, removeCartItem, updateQuantity } from "./controller/cart.controller.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { addCartSchema, getByIdSchema, updateCartSchema } from "./controller/cart.validator.js"



const cartRoutes = express.Router()

cartRoutes.route("/")
    .post(protectedRoutes, allowedTo("user"), validation(addCartSchema),addNewCart)
    .get(protectedRoutes, allowedTo("user"),getCart)
    .delete(protectedRoutes, allowedTo("user"),clearUserCart) 
cartRoutes.post("/applyingCoupon",protectedRoutes, allowedTo("user"), applyCoupon)    
cartRoutes.route("/:id")
    .patch(protectedRoutes, allowedTo("user"),validation(updateCartSchema), updateQuantity)
    .delete(protectedRoutes, allowedTo("user"),validation(getByIdSchema),removeCartItem)    

export default cartRoutes