import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordOmitUser } from '../user/user.type';
import { JwtPayload } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
  }

  async validate(name: string, password: string): Promise<PasswordOmitUser | null> {
    const user = await this.userService.findOne(name);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return null;
    }

    const { password: _, ...result } = user;

    return result;
  }

  async login(user: PasswordOmitUser) {
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    }
  }
}
