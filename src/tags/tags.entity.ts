import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 256,
  })
  name: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 256,
  })
  slug: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;
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
  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
