import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { uploadFileIntoCloud } from '../../utils/fileUpload';
import { IUser } from './auth.interface';
import { User } from './auth.model';
import {
  decodeToken,
  generateToken,
  hashingPassword,
  matchingPassword,
} from './auth.utils';

// register user service
const registerUser = async (file: any, payload: IUser) => {
  // uploading avatar
  const { secure_url } = (await uploadFileIntoCloud(file)) as any;
  if (!secure_url) {
    throw new AppError(httpStatus.BAD_REQUEST, 'File upload failed');
  }
  payload.avatar = secure_url;

  // hashing password
  payload.password = await hashingPassword(payload.password);

  const result = await User.create(payload);
  return result;
};

// login user service
const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExist = await User.findOne({ email: payload.email }).select(
    '+password',
  );
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // matching password
  const isPasswordMatched = await matchingPassword(
    payload.password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong password');
  }

  // generating token
  const jwtPayload = {
    _id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = await generateToken(
    jwtPayload,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRES,
  );

  const refreshToken = await generateToken(
    jwtPayload,
    config.REFRESH_TOKEN_SECRET,
    config.REFRESH_TOKEN_EXPIRES,
  );

  const user = {
    _id: isUserExist._id,
    name: isUserExist.name,
    avatar: isUserExist.avatar,
    email: isUserExist.email,
  };

  return { user, accessToken, refreshToken };
};

// refresh token service
const refreshToken = async (token: string) => {
  // decode token
  const decoded = (await decodeToken(
    token,
    config.REFRESH_TOKEN_SECRET,
  )) as JwtPayload;

  // check user exist
  const isUserExist = await User.findById(decoded._id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // generating new access token
  const jwtPayload = {
    _id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = await generateToken(
    jwtPayload,
    config.ACCESS_TOKEN_SECRET,
    config.ACCESS_TOKEN_EXPIRES,
  );

  const user = {
    _id: isUserExist._id,
    name: isUserExist.name,
    avatar: isUserExist.avatar,
    email: isUserExist.email,
  };

  return { user, accessToken };
};

// my profile service
const myProfile = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// exporting auth services
export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
  myProfile,
};
