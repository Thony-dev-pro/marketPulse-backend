import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mp_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 254, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('integer', { nullable: false })
  status: number;
}
