import { BaseDeleteEntity } from 'src/app/databases/common';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('family')
export class Family extends BaseDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  address?: string;

  // @OneToOne(() => User, (user) => user.family, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // father?: User;

  // @OneToOne(() => User, (user) => user.family, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // mother?: User;
}
