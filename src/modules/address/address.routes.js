import express from "express"
import { validation } from "../../middleware/validation.js"
import { addAddress, getLoggedUserAddress, removeAddress } from "./controller/address.controller.js"
import { addAddressSchema, deleteAddressSchema } from "./controller/address.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"




const addressRoutes = express.Router()

addressRoutes.route("/")
    .patch(protectedRoutes, allowedTo("user"),validation(addAddressSchema), addAddress)
    .get(protectedRoutes, allowedTo("user"),getLoggedUserAddress)


addressRoutes.route("/:id")
    .delete(protectedRoutes, allowedTo("user", "admin"),validation(deleteAddressSchema), removeAddress)    

export default addressRoutes