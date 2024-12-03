import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnumPostStatus, EnumPostType } from './enums';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 512,
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'enum',
    enum: EnumPostType,
    default: EnumPostType.POST,
  })
  postType: EnumPostType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: EnumPostStatus,
    default: EnumPostStatus.DRAFT,
  })
  status: EnumPostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', // datetime in mysql
    nullable: true,
  })
  publishOn?: Date;

  // Work on these in lectures on relationships
  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    // principle: alway delete parent then data child will degrate
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  metaOptions?: MetaOption;

  tags?: string[];
}
