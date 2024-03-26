import express from "express"
import { validation } from "../../middleware/validation.js"
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecificOrder } from "./controller/order.controller.js"
import { createOrderVal } from "./controller/order.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"




const orderRoutes = express.Router()

orderRoutes.route("/")
    // .post(createCashOrder)
    .get(allowedTo('user'),getSpecificOrder)
    orderRoutes.get('/allOrders',allowedTo('admin'),getAllOrders)
orderRoutes.route("/:id")
       .post(validation(createOrderVal), allowedTo('user'),createCashOrder)
    // .get(validation(getcartByIdSchema), getAllcartById)
    // .patch(validation(updatecartSchema), updatecart)
    // .delete(removeCartItem)    
orderRoutes.post("/checkout/:id", protectedRoutes, allowedTo('user'), createCheckOutSession)    

export default orderRoutes