import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { PRODUCT_STATUS } from '../common/constants/product-status.constant.js';

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

  async desactivateProduct(id: number): Promise<void> {
    await this.productsRepository.update(id, { status: PRODUCT_STATUS.INACTIVE });
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
      relations: {
        category: true,
      },
    });
  }
}
