import { User } from '../user/user.entity';
import { PasswordOmitUser } from '../user/user.type';

export type JwtPayload = Pick<User, 'id' | 'name'>;

export interface JwtRequest {
  user: PasswordOmitUser;
}
