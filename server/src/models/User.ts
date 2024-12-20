import { BaseDeleteEntity } from 'src/app/databases/common';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Family } from './Family';
import { GenderEnums } from 'src/app/utils/common-enums';

@Entity('user')
export class User extends BaseDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'enum', enum: GenderEnums, default: GenderEnums.MALE })
  gender: GenderEnums;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ unique: true })
  displayName?: string;

  @Column()
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToOne(() => Family, (family) => family.id, {
    onDelete: 'CASCADE',
  })
  family?: Family;
}
