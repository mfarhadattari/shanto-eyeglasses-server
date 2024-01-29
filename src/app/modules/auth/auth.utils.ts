import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';

/* ----------->> Hashing Password Function <<------------- */
export const hashingPassword = async (planPassword: string) => {
  try {
    const hash = await bcrypt.hash(
      planPassword,
      Number(config.BCRYPT_SALT_ROUNDS),
    );
    return hash;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to hash password ');
  }
};

/* ----------->> Matching Password Function <<------------- */
export const matchingPassword = async (
  planPassword: string,
  hashedPassword: string,
) => {
  try {
    const isMatched = await bcrypt.compare(planPassword, hashedPassword);
    return isMatched;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to matched password ');
  }
};

/* ----------->> Token Generator Function <<------------- */
export const generateToken = async (
  payload: { _id: Types.ObjectId; email: string },
  secret: string,
  expires: string,
) => {
  try {
    const token = jwt.sign(payload, secret, { expiresIn: expires });
    return token;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to generate token');
  }
};

/* ----------->> Token Decoder Function <<------------- */
export const decodeToken = async (token: string, secret: string) => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error: any) {
    throw new AppError(httpStatus.UNAUTHORIZED, error.message);
  }
};
