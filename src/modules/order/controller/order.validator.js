import Joi from "joi"

export const createOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    shippingAddress:Joi.object({
        street:Joi.string().trim().required(),
        city:Joi.string().trim().required(),
        phone:Joi.string().trim().required(),
    }).required()
})

export const getReviewByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateReviewSchema = Joi.object({
    text: Joi.string().min(1).max(200).trim(),
    rate: Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24),
    id: Joi.string().hex().length(24).required()
})

export const deleteReviewSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})