import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
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
  async login(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {
    try {
      const user = await this.authService.login(email, password);
      if (!user) {
        throw new InvalidCredentialsException();
      }
      const token = await this.authService.generateToken(user);
      const { password: _, ...userWithoutPassword } = user;
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });
      return res.json({ user: userWithoutPassword, token });
    } catch (error: unknown) {
      if (error instanceof InvalidCredentialsException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
