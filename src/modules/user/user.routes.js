import express from "express"
import { addUser, changePassword, deleteUser, getAllUserById, getAllUsers, updateUser } from "./controller/user.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"

const userRoutes = express.Router()

userRoutes.route("/")
    .post(checkEmail, addUser)
    .get(getAllUsers)

    userRoutes.route("/:id")
    .get( getAllUserById)
    .put( updateUser)
    .delete( deleteUser)    
    .patch( changePassword)

export default userRoutes