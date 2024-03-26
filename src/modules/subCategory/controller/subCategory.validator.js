import Joi from "joi"

export const addSubCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    category: Joi.string().hex().length(24).required(0),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(), 
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
})

export const getSubCategoryByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateSubCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    id: Joi.string().hex().length(24).required()
})

export const deleteSubCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})