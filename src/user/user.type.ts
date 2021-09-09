import { User } from './user.entity';

export type PasswordOmitUser = Omit<User, 'password'>;
