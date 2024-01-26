import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';

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
