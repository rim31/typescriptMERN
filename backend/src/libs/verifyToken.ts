import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

// verifying token, and return in header the token 
export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth_token");
  if (!token) return res.status(401).json("Access Denied");

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'testToken') as IPayload;
  // console.log(payload);
  req.userId = payload._id;

  next();
}