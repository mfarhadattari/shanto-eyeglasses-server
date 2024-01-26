import { uploadFileIntoCloud } from '../../utils/fileUpload';
import { IUser } from './auth.interface';
import { User } from './auth.model';
import { hashingPassword } from './auth.utils';

// register user service
const registerUser = async (file: any, payload: IUser) => {
  // uploading avatar
  const { secure_url } = (await uploadFileIntoCloud(file)) as any;
  payload.avatar = secure_url;

  // hashing password
  payload.password = await hashingPassword(payload.password);

  const result = await User.create(payload);
  return result;
};

// exporting auth services
export const AuthServices = { registerUser };
