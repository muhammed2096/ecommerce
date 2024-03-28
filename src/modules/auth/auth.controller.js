import userModel from "../../../database/models/user.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utilties/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import {sendEmail} from "../../email/sendEmail.js"

export const signUp = handleAsyncError(async (req, res, next) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) return next(new appError("Email already exist :(", 409));
  let user = new userModel(req.body);
  await user.save();
  sendEmail({email, api:`http://localhost:3000/api/v1/user/verify/${verifyToken}`})
  res.json({ message: "Success", user });
});

export const signIn = handleAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if(foundedUser){
    if(foundedUser.isVerfied){
        let matched = bcrypt.compareSync(password, foundedUser.password)
    if(matched){
        let token = jwt.sign({
          name: foundedUser.name,
          userId: foundedUser._id,
          role: foundedUser.role,
        }, process.env.SECRET_KEY)
        res.json({message:"welcome", token})
    }else{ 
        next(new appError(`Invalid password, try again later`, 400))
    }
    }else{
        next(new appError("please verify your email first", 401))
    }
}else{
    next(new appError("You have to register first", 400))
}
});

export const verifyEmail = handleAsyncError(async (req, res, next)=>{
  let {token} = req.params
  jwt.verify(token, process.env.Verify_SECRET, async (err, decoded)=>{
      if(err) return next(new appError("You have to register first", 401))
      let verifiedUser = await userModel.findByIdAndUpdate(decoded.id, {isVerfied: true}, {new: true})
      res.json({message:"Success", verifiedUser})
  })
}) 

export const forgotPassword = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new appError('User not found', 404));
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  await user.save();
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "test011524@gmail.com",
      pass: "rbmfawkhxwjrrfle",
    },
  })
 
  const info =   transporter.sendMail({
    from: '"Fred Foo 👻" <test011524@gmail.com>',
    to: email,
    subject: 'Forgot Password - OTP Verification',
    text: `Your OTP is: ${otp}`,
  }, (error, info) => {
    if (error) {
      return next(new appError('Email sending failed', 500));
    }
    res.json({ message: 'OTP sent successfully' });
  });
})


export const resetPassword = handleAsyncError(async (req, res,next) => {
  const { email, newPassword } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new appError('User not found', 404));
  }
  const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALTROUNDS));
  user.password = hashedPassword;
  await user.save();
  res.json({ message: 'Password reset successfully', user }); 
}) 

export const protectedRoutes = handleAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new appError("please provide token", 401));
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  let user = await userModel.findById(decoded.id);
  if (!user) return next(new appError("user not found", 401));
  if (changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePasswordTime > decoded.iat)
      return next(new appError("token invalid", 401));
  }
  req.user = user
  next();
});

export const allowedTo = (...roles) => {
    return handleAsyncError(async (req, res, next) => {
        if(!roles.includes(req.user.role))
        return next(new appError("you are not authorized :(", 401))
        next()
    });
  };
