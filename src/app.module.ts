import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module.ts';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { User } from './users/entities/user.entity.ts';

function parseExpiresIn(exp: string): number {
  const match = exp.match(/^(\d+)([smhd]?)$/);
  if (!match) return 3600;
  const [, value, unit] = match;
  const seconds = parseInt(value, 10);
  switch (unit) {
    case 'm': return seconds * 60;
    case 'h': return seconds * 3600;
    case 'd': return seconds * 86400;
    default: return seconds;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: parseExpiresIn(process.env.JWT_EXPIRES_IN || '15m') },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
