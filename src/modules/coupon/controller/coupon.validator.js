import Joi from "joi"

export const addCouoponSchema = Joi.object({
    code: Joi.string().min(1).max(200).required().trim(),
    discount: Joi.number().min(0).required(),
    expires:Joi.date().required()
})

export const getCouponByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateCouponSchema = Joi.object({
    text: Joi.string().min(1).max(200).trim(),
    code: Joi.string().min(1).max(200).trim(),
    discount: Joi.number().min(0),
    expires:Joi.date()
})

export const deleteCouponSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})