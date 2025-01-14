export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'manager' | 'user';
}
