import Joi from "joi"

export const addToWishlistSchema = Joi.object({
    product:Joi.string().hex().length(24).required()
})

export const getWishListByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateWishListSchema = Joi.object({
    product:Joi.string().hex().length(24).required()
})

export const deleteWishListSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})