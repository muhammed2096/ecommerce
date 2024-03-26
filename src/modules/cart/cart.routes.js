import express from "express"
import { validation } from "../../middleware/validation.js"
import { addNewCart, getCart, removeCartItem } from "./controller/cart.controller.js"



const cartRoutes = express.Router()

cartRoutes.route("/")
    .post(addNewCart)
    .get(getCart)

cartRoutes.route("/:id")
    // .get(validation(getcartByIdSchema), getAllcartById)
    // .patch(validation(updatecartSchema), updatecart)
    .delete(removeCartItem)    

export default cartRoutes