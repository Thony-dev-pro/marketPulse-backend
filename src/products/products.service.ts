import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async create(name: string, category_id: number, description: string, unit: string, status: number): Promise<Product> {
    const product = this.productsRepository.create({
      name,
      category_id,
      description,
      unit,
      status,
    });
    return await this.productsRepository.save(product);
  }
}
