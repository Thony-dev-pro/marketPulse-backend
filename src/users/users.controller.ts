import { Controller, Get, Patch, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service.ts';
import { User } from './entities/user.entity.ts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('email')
  @UseGuards(JwtAuthGuard)
  async updateEmail(@Req() req: any, @Body('email') newEmail: string): Promise<{id: number; email: string}> {
    const user = await this.usersService.updateEmail(req.user.id, newEmail);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
