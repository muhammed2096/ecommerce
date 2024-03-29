import express from 'express'
import {validation} from '../../middleware/validation.js'

import {checkEmail} from './../../middleware/checkEmail.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addUser, deleteUser, getSingleUser, getUsers, updateUser } from './controller/user.controller.js'
import { addUserVal, paramsIdVal, updateUserVal } from './controller/user.validator.js'
const userRouter = express.Router()

userRouter
.route('/')
.post(protectedRoutes,validation(addUserVal),checkEmail,allowedTo('admin'),addUser)
.get(protectedRoutes,allowedTo('admin'),getUsers) 
userRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),allowedTo('admin','user'),getSingleUser)
.delete(protectedRoutes,validation(paramsIdVal),allowedTo('admin'),deleteUser)
.put(protectedRoutes,validation(updateUserVal),allowedTo('admin','user'),updateUser)



export default userRouter