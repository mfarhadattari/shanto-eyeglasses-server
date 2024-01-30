import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { User } from '../modules/auth/auth.model';
import { decodeToken } from '../modules/auth/auth.utils';
import catchAsync from '../utils/catchAsync';

const authValidator = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // check token exist
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, access token not found',
      );
    }

    // decode token
    const decoded = (await decodeToken(
      accessToken,
      config.ACCESS_TOKEN_SECRET,
    )) as JwtPayload;

    // check user exist
    const isUserExist = await User.findById(decoded._id);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    req.user = decoded;
    next();
  },
);

export default authValidator;
