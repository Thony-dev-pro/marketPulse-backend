import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.ts';
import { InvalidCredentialsException } from '../common/exceptions/invalid-credentials.exception.ts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.createUser(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const user = await this.authService.login(email, password);
      if (!user) {
        throw new InvalidCredentialsException();
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof InvalidCredentialsException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
