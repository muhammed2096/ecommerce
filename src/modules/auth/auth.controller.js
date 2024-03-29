


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { userModel } from '../../../database/models/user.model.js'
import { appError } from '../../utilties/appError.js'
import { sendEmail } from '../../email/sendEmail.js'
import { catchError } from '../../middleware/catchError.js'

const signUp = catchError(async (req, res, next) => {
    let Code = nanoid(6);
    req.body.verifyCode = Code
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    sendEmail(Code, req.body.email)
    !user && next(new appError('invalid data', 404))
    user && res.send({ msg: 'success', token })
})

const signIn = catchError(async (req, res, next) => {
    let { email, password } = req.body
    let checkEmail = await userModel.findOne({ email })
    if (!checkEmail) return next(new appError('emial Not Founded',404))
    else {
        let checkPassword = bcrypt.compareSync(password, checkEmail.password)
        if (!checkPassword) return next(new appError('passwor incorrect', 401))
        let token = jwt.sign({ userId: checkEmail._id, role: checkEmail.role }, process.env.SECERET_KEY)
        res.send({ msg: "success", token })
    }
})
const protectedRoutes = catchError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new appError('invalid Token', 401))
    let decoded = jwt.verify(token, process.env.SECERET_KEY)
    if (!decoded) return next(new appError('invalid decoded', 401))
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new appError('user not founded login again', 404))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if (time > decoded.iat) return next(new appError('invalid token log in again', 401))
    }
    req.user = user
    next()
})
const changePassword = catchError(async (req, res, next) => {
    let { oldPassword, newPassword } = req.body
    if (bcrypt.compareSync(oldPassword, req.user.password)) {
        await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.SECERET_KEY)
        return res.send({ msg: 'success', token })
    }

})
const isVerify = catchError(async (req, res, next) => {
    let verify = await userModel.findOne({ _id: req.user._id, verifyCode: req.body.code })
    if (!verify) return next(new appError('code invalid', 401))
    let verified = await userModel.findOneAndUpdate({ _id: req.user._id }, { isverify: true },)
    if (!verified) return next(new appError('verify faild', 401))
    res.send({ msg: 'success' })
})
const forgetPassword = catchError(async (req, res, next) => {
    let { email } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return next(new appError('no account for this email', 401))
    let resetCode = nanoid(6)
    await userModel.findOneAndUpdate({ email }, { resetCode })
    sendEmail(resetCode, email)
    res.send({ msg: 'success' })
})
const checkCode = catchError(async (req, res, next) => {
    let { email, code } = req.body
    let verify = await userModel.findOne({ email: email, resetCode: code })
    if (!verify) return next(new appError('code invalid', 401))
    res.send({ msg: 'success' })
})
const resetPassword = catchError(async (req, res, next) => {
    let user = await userModel.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    res.send({ msg: 'success', token })
})

function allowedTo(...roles){
  return(req,res,next)=>{
      if(!roles.includes(req.user.role)) return next(new appError('You Are Not allowed',401))
      next()
  }
}


export {
    signUp,
    protectedRoutes,
    signIn,
    changePassword,
    isVerify,
    forgetPassword,
    checkCode,
    resetPassword,
    allowedTo
}