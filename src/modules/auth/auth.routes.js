import express from 'express'
import { forgotPassword, resetPassword, signIn, signUp, verifyEmail } from './auth.controller.js'
import { forgotPasswordSchema, resetPasswordSchema } from '../user/controller/user.validator.js'
import { validation } from '../../middleware/validation.js'
import { signInSchema, signUpSchema } from './auth.validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'



const authRoutes = express.Router()


authRoutes.post('/signup',validation(signUpSchema),  signUp)
authRoutes.post('/signin',validation(signInSchema), signIn)
authRoutes.get("/verify/:token", verifyEmail)
authRoutes.post("/forgotPassword",validation(forgotPasswordSchema), forgotPassword)
authRoutes.post("/resetPassword",validation(resetPasswordSchema), resetPassword)


export default authRoutes