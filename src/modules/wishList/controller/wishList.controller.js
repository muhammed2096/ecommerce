

import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import userModel from "../../../../database/models/user.model.js";



const addToWishlist = handleAsyncError(async (req, res)=>{
    let wishlist = await userModel.findOneAndUpdate(req.user._id, {$addToSet:{wishlist:req.body.product}}, {new:true}).populate('wishlist')
    wishlist && res.json({message:"Success", wishlist:wishlist.wishlist})
    !wishlist && next(new appError("Wishlist not found ! :(", 401))   
}
)

const removeFromWishlist = handleAsyncError(async (req, res)=>{
    let wishlist = await userModel.findOneAndUpdate(req.user._id, {$pull:{wishlist:req.params.id}}, {new:true}).populate('wishlist')
    wishlist && res.json({message:"Success", wishlist:wishlist.wishlist})
    !wishlist && next(new appError("Wishlist not found ! :(", 401))   
}
)
const getLoggedUserWishlist = handleAsyncError(async (req, res)=>{
    let {wishlist} = await userModel.findById(req.user._id).populate('wishlist')
    wishlist && res.json({message:"Success", wishlist})
    !wishlist && next(new appError("Wishlist not found ! :(", 401))   
}
)


export {
addToWishlist,
removeFromWishlist,
getLoggedUserWishlist
}