import { IUser } from './auth.interface';

// register user service
const registerUser = async (payload: IUser) => {
  console.log(payload);
};

// exporting auth services
export const AuthServices = {registerUser};
