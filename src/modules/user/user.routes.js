import express from "express"
import { addUser, changePassword, deleteUser, getAllUserById, getAllUsers, updateUser } from "./controller/user.controller.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"
import { addUserSchema, paramsIdVal, updateSchema } from "./controller/user.validator.js"
import { validation } from "../../middleware/validation.js"
import { changePasswordSchema } from "../auth/auth.validation.js"
import { checkEmail } from "../../middleware/checkEmail.js"

const userRoutes = express.Router()

userRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"),checkEmail,validation(addUserSchema), addUser)
    .get(protectedRoutes, allowedTo("admin"), getAllUsers)

    userRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("admin"),validation(paramsIdVal), getAllUserById)
    .put( protectedRoutes,validation(updateSchema),updateUser)
    .delete(protectedRoutes,validation(paramsIdVal), deleteUser)    
    .patch(protectedRoutes,validation(changePasswordSchema), changePassword)

export default userRoutes