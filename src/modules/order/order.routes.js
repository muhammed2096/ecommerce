import express from "express"
import { validation } from "../../middleware/validation.js"
import { createCashOrder, createCheckOutSession, getAllOrders, getSpecificOrder } from "./controller/order.controller.js"
import { createOrderVal, getByIdSchema } from "./controller/order.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"




const orderRoutes = express.Router()

orderRoutes.route("/")
    .get(protectedRoutes,allowedTo('user'),getSpecificOrder)
orderRoutes.get('/allOrders',protectedRoutes,allowedTo('admin'), validation(getByIdSchema),getAllOrders)
orderRoutes.route("/:id")
       .post(protectedRoutes,allowedTo('user'),validation(createOrderVal), createCashOrder) 
orderRoutes.post("/checkout/:id", protectedRoutes, allowedTo('user'), createCheckOutSession)    

export default orderRoutes