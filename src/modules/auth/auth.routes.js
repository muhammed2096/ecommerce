import express from 'express'
import { validation } from './../../../src/middleware/validation.js'
import { checkEmail } from '../../middleware/checkEmail.js'

import { changePassword, checkCode, forgetPassword, isVerify, protectedRoutes, resetPassword, signIn, signUp } from './auth.controller.js'
import { changePasswordVal, checkCodeVal, forgetPasswordVal, isverifyVal, resetPasswordVal, signInValidation, signUpValidation } from './auth.validation.js'
const authRouter = express.Router()

authRouter.post('/signUp', validation(signUpValidation), checkEmail, signUp)
authRouter.post('/signIn', validation(signInValidation), signIn)
authRouter.patch('/changedPassword', protectedRoutes, validation(changePasswordVal), changePassword)
authRouter.post('/verification', protectedRoutes, validation(isverifyVal), isVerify)
authRouter.post('/forgetPassword', validation(forgetPasswordVal), forgetPassword)
authRouter.post('/checkCode', validation(checkCodeVal), checkCode)
authRouter.post('/resetPassword', validation(resetPasswordVal), resetPassword)

export default authRouter