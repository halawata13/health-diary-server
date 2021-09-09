import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return {
      id: payload.id,
      name: payload.name,
    };
  }
}
