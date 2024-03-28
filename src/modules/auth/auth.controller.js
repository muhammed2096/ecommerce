// import userModel from "../../../database/models/user.model.js";
// import { handleAsyncError } from "../../middleware/handleAsyncError.js";
// import { appError } from "../../utilties/appError.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import { sendEmail } from "../../email/sendEmail.js";

// export const signUp = handleAsyncError(async (req, res, next) => {
//   let user = new userModel(req.body)
//   await user.save()
//   let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
//   sendEmail({
//       email,
//       api: `https://ecommerce-pxr2.onrender.com/api/v1/user/verify/${verifyToken}`,
//     });
//   !user && next(new appError('invalid data', 404))
//   user && res.send({ msg: 'success', token })
// });



// export const signIn = handleAsyncError(async (req, res, next) => {
//   let { email, password } = req.body;
//   let foundedUser = await userModel.findOne({ email });
//   if (foundedUser) {
//     if (foundedUser.isVerfied) {
//       let matched = bcrypt.compareSync(password, foundedUser.password);
//       if (matched) {
//         let token = jwt.sign(
//           {
//             name: foundedUser.name,
//             userId: foundedUser._id,
//             role: foundedUser.role,
//           },
//           process.env.SECRET_KEY
//         );
//         res.json({ message: "welcome", token });
//       } else {
//         next(new appError(`Invalid password, try again later`, 400));
//       }
//     } else {
//       next(new appError("please verify your email first", 401));
//     }
//   } else {
//     next(new appError("You have to register first", 400));
//   }
// });

// export const verifyEmail = handleAsyncError(async (req, res, next) => {
//   let { token } = req.params;
//   jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
//     if (err) return next(new appError("You have to register first", 401));
//     let verifiedUser = await userModel.findByIdAndUpdate(
//       decoded.id,
//       { isVerfied: true },
//       { new: true }
//     );
//     res.json({ message: "Success", verifiedUser });
//   });
// });

// export const forgotPassword = handleAsyncError(async (req, res, next) => {
//   const { email } = req.body;
//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return next(new appError("User not found", 404));
//   }
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   await user.save();
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "test011524@gmail.com",
//       pass: "rbmfawkhxwjrrfle",
//     },
//   });

//   const info = transporter.sendMail(
//     {
//       from: '"Fred Foo 👻" <test011524@gmail.com>',
//       to: email,
//       subject: "Forgot Password - OTP Verification",
//       text: `Your OTP is: ${otp}`,
//     },
//     (error, info) => {
//       if (error) {
//         return next(new appError("Email sending failed", 500));
//       }
//       res.json({ message: "OTP sent successfully" });
//     }
//   );
// });

// export const resetPassword = handleAsyncError(async (req, res, next) => {
//   const { email, newPassword } = req.body;
//   const user = await userModel.findOne({ email });
//   if (!user) {
//     return next(new appError("User not found", 404));
//   }
//   const hashedPassword = await bcrypt.hash(
//     newPassword,
//     parseInt(process.env.SALTROUNDS)
//   );
//   user.password = hashedPassword;
//   await user.save();
//   res.json({ message: "Password reset successfully", user });
// });

// export const protectedRoutes = handleAsyncError(async (req, res, next) => {
//   let { token } = req.headers;
//   if (!token) return next(new appError("please provide token", 401));
//   let decoded = jwt.verify(token, process.env.SECRET_KEY);
//   let user = await userModel.findById(decoded.id);
//   if (!user) return next(new appError("user not found", 401));
//   if (changePasswordAt) {
//     let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
//     if (changePasswordTime > decoded.iat)
//       return next(new appError("token invalid", 401));
//   }
//   req.user = user;
//   next();
// });

// export const allowedTo = (...roles) => {
//   return handleAsyncError(async (req, res, next) => {
//     if (!roles.includes(req.user.role))
//       return next(new appError("you are not authorized :(", 401));
//     next();
//   });
// };




import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { handleAsyncError } from '../../middleware/handleAsyncError.js'
import { appError } from '../../utilties/appError.js'
import { sendEmail } from '../../email/sendEmail.js'
import  userModel  from '../../../database/models/user.model.js'

const signUp = handleAsyncError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    sendEmail({email, api: `https://ecommerce-pxr2.onrender.com/api/v1/user/verify/${verifyToken}`});
    !user && next(new appError('invalid data', 404))
    user && res.send({ msg: 'success', token })
})

const signIn = handleAsyncError(async (req, res, next) => {
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
const protectedRoutes = handleAsyncError(async (req, res, next) => {
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
const changePassword = handleAsyncError(async (req, res, next) => {
    let { oldPassword, newPassword } = req.body
    if (bcrypt.compareSync(oldPassword, req.user.password)) {
        await userModel.findByIdAndUpdate(req.user._id, { password: newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: req.user._id, role: req.user.role }, process.env.SECERET_KEY)
        return res.send({ msg: 'success', token })
    }

})
const verifyEmail = handleAsyncError(async (req, res, next) => {
    let verify = await userModel.findOne({ _id: req.user._id, verifyCode: req.body.code })
    if (!verify) return next(new appError('code invalid', 401))
    let verified = await userModel.findOneAndUpdate({ _id: req.user._id }, { isverify: true },)
    if (!verified) return next(new appError('verify faild', 401))
    res.send({ msg: 'success' })
})
const forgotPassword = handleAsyncError(async (req, res, next) => {
    let { email } = req.body
    let user = await userModel.findOne({ email })
    if (!user) return next(new appError('no account for this email', 401))
    let resetCode = nanoid(6)
    await userModel.findOneAndUpdate({ email }, { resetCode })
    sendEmail(resetCode, email)
    res.send({ msg: 'success' })
})
const checkCode = handleAsyncError(async (req, res, next) => {
    let { email, code } = req.body
    let verify = await userModel.findOne({ email: email, resetCode: code })
    if (!verify) return next(new appError('code invalid', 401))
    res.send({ msg: 'success' })
})
const resetPassword = handleAsyncError(async (req, res, next) => {
    let user = await userModel.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECERET_KEY)
    res.send({ msg: 'success', token })
})

const allowedTo = (...roles) => {
  return handleAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new appError("you are not authorized :(", 401));
    next();
  });
};


export {
    signUp,
    protectedRoutes,
    signIn,
    changePassword,
    verifyEmail,
    forgotPassword,
    checkCode,
    resetPassword,
    allowedTo
}