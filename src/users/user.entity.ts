import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 96,
    type: 'varchar',
  })
  firstName: string;

  @Column({
    length: 96,
    nullable: true,
    type: 'varchar',
  })
  lastName: string;

  @Column({
    length: 255,
    unique: true,
    type: 'varchar',
  })
  email: string;

  @Column({
    length: 255,
    type: 'varchar',
  })
  password: string;
}
