import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// =========== register ========== // HEADERS : Content-Type : application/json
export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  user.password = await user.encryptPassword(user.password)
  console.log(user);

  // promise / async await to save data
  const savedUser = await user.save();
  console.log(savedUser);

  // TOKEN
  const token: string = jwt.sign({ _id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET || 'testToken')
  if (!token) return res.status(400).json("error token creation")
  // res.send(token);
  res.status(200).header('auth_token', token).json(savedUser);
};

// ============ login ============ // HEADERS : Content-Type : application/json
export const signin = async (req: Request, res: Response) => {
  // checking the user input
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json('wrong email or password')
  // checking password
  const correctPassword: boolean = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json('invalid password');
  // checking jwt
  const token: string = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET || 'testToken', {
    // expiresIn: 60 * 60 * 2 // = 2hours
    expiresIn: 60 * parseInt(process.env.TOKEN_TIME || '')
  })
  res.status(200).header('auth_token', token).json(user);
};

// =========== user profile =========== //
export const profile = async (req: Request, res: Response) => {
  // console.log(req.header('auth_token')); // use a function in libs/verifyToken.ts to give userId
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json("no user found");
  res.status(200).send(user);
};


// =========== update password profile =========== //
export const updatePassword = async (req: Request, res: Response) => {
  try {// use interface cause problem with promise
    const user: IUser = new User({
      username: 'req.body.username',
      email: 'req.body.email',
      password: req.body.password
    })
    user.password = await user.encryptPassword(user.password)
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { password: user.password } }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(404).json({ message: err })
  }
};