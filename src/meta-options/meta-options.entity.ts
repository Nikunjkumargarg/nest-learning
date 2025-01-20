import { Posts } from 'src/posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class metaOptions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(() => Posts, (post) => post.metaOptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Posts;
}
