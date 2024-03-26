import userModel from "../../../database/models/user.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utilties/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = handleAsyncError(async (req, res, next) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) return next(new appError("Email already exist :(", 409));
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "Success", user });
});

export const signIn = handleAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  const matched = await bcrypt.compare(password, foundedUser.password);
  if (foundedUser && matched) {
    let token = jwt.sign(
      {
        name: foundedUser.name,
        userId: foundedUser._id,
        role: foundedUser.role,
      },
      process.env.SECRET_KEY
    );
    return res.json({ message: "success", token });
  }
  next(new appError("Incorrect Email or Password :(", 401));
});

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
