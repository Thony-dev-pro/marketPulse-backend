import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';

@Entity('mp_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'integer', name: 'category_id', nullable: false })
  category_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'char', length: 5, nullable: true })
  unit: string;

  @Column({ type: 'integer', nullable: false })
  status: number;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
