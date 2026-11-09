import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module.ts';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { User } from './users/entities/user.entity.ts';
import { ProductsModule } from './products/products.module.ts';
import { CategoriesModule } from './categories/categories.module.ts';
import { Product } from './products/entities/product.entity.js';
import { Category } from './categories/entities/category.entity.js';
import { JwtStrategy } from './auth/strategies/jwt.strategy.ts';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.ts';

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
      entities: [User, Product, Category],
      synchronize: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiresIn = config.get<string>('JWT_EXPIRES_IN') || '15m';
        return {
          secret: secret || 'default-secret',
          signOptions: { expiresIn: parseExpiresIn(expiresIn) },
        };
      },
    }),
    PassportModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
