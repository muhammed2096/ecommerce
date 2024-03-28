import Joi from "joi"

export const addAddressSchema = Joi.object({
    street:Joi.string().required().trim(),
    phone:Joi.string().required().trim(),
    city:Joi.string().required().trim()
})

export const getAddressByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const deleteAddressSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})