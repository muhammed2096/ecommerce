import Joi from "joi"

export const addBrandSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
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

export const getBrandByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateBrandSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    id: Joi.string().hex().length(24).required()
})

export const deleteBrandSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})