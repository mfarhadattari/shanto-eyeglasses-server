import { IUser } from './auth.interface';
import { User } from './auth.model';
import { hashingPassword } from './auth.utils';

// register user service
const registerUser = async (payload: IUser) => {
  // uploading avatar
  payload.avatar = '/public/icon.png';

  // hashing password
  payload.password = await hashingPassword(payload.password);

  const result = await User.create(payload);
  return result;
};

// exporting auth services
export const AuthServices = { registerUser };
