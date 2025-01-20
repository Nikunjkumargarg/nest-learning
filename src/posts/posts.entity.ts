import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options.dto';
import { takeUntil } from 'rxjs';
import { metaOptions } from 'src/meta-options/meta-options.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;
  @Column({
    type: 'enum',
    enum: postType,
    default: postType.POST,
    nullable: false,
  })
  postType: postType;
  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;
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
    nullable: true,
    length: 1024,
  })
  featuredImageUrl?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;
  tags?: string[];

  @OneToOne(() => metaOptions, { cascade: true })
  @JoinColumn()
  metaOptions?: metaOptions;
}
