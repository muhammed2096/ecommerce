import express from "express"
import { validation } from "../../middleware/validation.js"
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./controller/wishList.controller.js"
import { addToWishlistSchema, deleteWishListSchema } from "./controller/wishList.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"



const wishlistRoutes = express.Router()

wishlistRoutes.route("/")
    .patch(protectedRoutes, allowedTo("user"),validation(addToWishlistSchema), addToWishlist)
    .get(protectedRoutes, allowedTo("user"),getLoggedUserWishlist)


wishlistRoutes.route("/:id")
    .delete(protectedRoutes, allowedTo("user"),validation(deleteWishListSchema), removeFromWishlist)    

export default wishlistRoutes