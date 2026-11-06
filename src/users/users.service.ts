import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateEmail(id: number, newEmail: string): Promise<{ id: number; email: string } | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    user.email = newEmail.trim();
    await this.usersRepository.save(user);
    return { id: user.id, email: user.email };
  }
}
