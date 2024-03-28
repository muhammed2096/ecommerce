import Joi from "joi";


export const signUpSchema = Joi.object({
    name:Joi.string().min(3).max(10).trim().required(),
    email:Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    phone:Joi.string().length(11).required(),
    role:Joi.string().valid('user', 'admin')
})
export const signInSchema = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required()
})

export const changePasswordSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    oldPassword:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    newPassword:Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required()
})