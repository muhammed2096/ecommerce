import Joi from "joi";


export const addUserSchema = Joi.object({
    name:Joi.string().min(3).max(10).required(),
    email:Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    phone:Joi.string().length(11).required(),
    role:Joi.string().valid('user', 'admin')
})


export const updateSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(3).max(10),
    email:Joi.string().email(),
    phone:Joi.string().length(11),
    role:Joi.string().valid('user', 'admin')
})

export const paramsIdVal = Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const getAllUserAccsSchema = Joi.object({
    recoveryEmail:Joi.string().email().required()
})

export const forgotPasswordSchema = Joi.object({
    email:Joi.string().email().required()
})

export const resetPasswordSchema = Joi.object({
    email:Joi.string().email().required(),
    newPassword:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    otp:Joi.string().length(6).required()
})