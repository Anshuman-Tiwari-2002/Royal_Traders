import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import { IUser } from '../models/User';
import mongoose from 'mongoose';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: (user._id as mongoose.Types.ObjectId).toString(),
    email: user.email,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, config.jwt.secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 