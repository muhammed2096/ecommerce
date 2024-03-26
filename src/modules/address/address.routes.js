import express from "express"
import { validation } from "../../middleware/validation.js"
import { addAddress, getLoggedUserAddress, removeAddress } from "./controller/address.controller.js"
import { addAddressSchema, deleteAddressSchema } from "./controller/address.validator.js"




const addressRoutes = express.Router()

addressRoutes.route("/")
    .patch(validation(addAddressSchema), addAddress)
    .get(getLoggedUserAddress)


addressRoutes.route("/:id")
    .delete(validation(deleteAddressSchema), removeAddress)    

export default addressRoutes