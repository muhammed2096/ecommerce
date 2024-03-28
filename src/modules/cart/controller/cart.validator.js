import Joi from "joi"

export const addCartSchema = Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().options({convert:false})
})

export const getByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateCartSchema = Joi.object({
    quantity:Joi.number().options({convert:false}),
    id: Joi.string().hex().length(24).required()
})

