import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '360000s',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    ...userProviders,
  ],
  exports: [
    AuthService,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
