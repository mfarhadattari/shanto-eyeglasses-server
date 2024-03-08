import config from '../config';
import { User } from '../modules/auth/auth.model';
import { hashingPassword } from '../modules/auth/auth.utils';

export const seedManager = async () => {
  const managerInfo = { ...config.MANAGER_INFO };
  managerInfo.password = await hashingPassword(managerInfo.password);
  // check if the manager is already exists
  const isAlreadyExists = await User.findOne({ role: 'manager' });
  if (!isAlreadyExists) {
    await User.create(managerInfo);
  }
};
