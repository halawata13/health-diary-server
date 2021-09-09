import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './jwt.guard';
import { JwtRequest } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: JwtRequest) {
    const user = req.user;
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Req() req: JwtRequest) {
    return req.user;
  }
}
