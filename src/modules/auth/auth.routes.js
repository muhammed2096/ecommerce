import express from 'express'
import { signIn, signUp } from './auth.controller.js'


const authRoutes = express.Router()


authRoutes.post('/signup', signUp)
authRoutes.post('/signin', signIn)


export default authRoutes