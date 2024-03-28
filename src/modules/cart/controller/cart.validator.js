import Joi from "joi"

export const addCartSchema = Joi.object({
    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().options({convert:false})
})

export const getByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateCartSchema = Joi.object({
    text: Joi.string().min(1).max(200).trim(),
    rate: Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24),
    id: Joi.string().hex().length(24).required()
})

