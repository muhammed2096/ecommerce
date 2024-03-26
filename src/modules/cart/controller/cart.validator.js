import Joi from "joi"

export const addReviewSchema = Joi.object({
    text: Joi.string().min(1).max(200).required().trim(),
    rate: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required()
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