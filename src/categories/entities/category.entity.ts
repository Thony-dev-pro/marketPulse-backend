import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mp_categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  name: string;
}
