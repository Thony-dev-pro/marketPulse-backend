import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.ts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.createUser(email, password);
  }
}
