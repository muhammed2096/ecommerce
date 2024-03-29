import express from 'express'
import {validation} from '../../middleware/validation.js'
import { isVerify } from '../../middleware/isVerify.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { createCashOrder, createCheckOutSession, getSpcificOrder, getallOrders } from './controller/order.controller.js'
import { createCashOrderVal } from './controller/order.validator.js'


const orderRouter = express.Router()

orderRouter
.route('/')
.get(protectedRoutes, isVerify,allowedTo('user','admin'),getSpcificOrder)

orderRouter.get('/allOrder',protectedRoutes,allowedTo('admin'),getallOrders)
.route('/:id')
.post(protectedRoutes, isVerify,allowedTo('user'),validation(createCashOrderVal),createCashOrder)

orderRouter.post('/checkout/:id',protectedRoutes, isVerify,allowedTo('user'),validation(createCashOrderVal),createCheckOutSession)


export default orderRouter