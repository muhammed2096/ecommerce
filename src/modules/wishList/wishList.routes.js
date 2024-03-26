import express from "express"
import { validation } from "../../middleware/validation.js"
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./controller/wishList.controller.js"
import { addToWishlistSchema, deleteWishListSchema } from "./controller/wishList.validator.js"



const wishlistRoutes = express.Router()

wishlistRoutes.route("/")
    .patch(validation(addToWishlistSchema), addToWishlist)
    .get(getLoggedUserWishlist)


wishlistRoutes.route("/:id")
    .delete(validation(deleteWishListSchema), removeFromWishlist)    

export default wishlistRoutes