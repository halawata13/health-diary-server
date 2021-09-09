import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseLocalStrategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PasswordOmitUser } from '../user/user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<PasswordOmitUser> {
    const user = await this.authService.validate(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
