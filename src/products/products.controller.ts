import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { ProductsService } from './products.service.ts';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  findByName(@Query('name') name: string) {
    return this.productsService.findByName(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body('name') name: string, @Body('category_id') category_id: number, @Body('description') description: string, @Body('unit') unit: string, @Body('status') status: number) {
    return this.productsService.create(name, category_id, description, unit, status);
  }

  @Patch(':id/desactivate')
  @UseGuards(JwtAuthGuard)
  desactivate(@Param('id') id: number) {
    return this.productsService.desactivateProduct(id);
  }
}
