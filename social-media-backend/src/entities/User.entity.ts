import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { PostEntity } from './post.entity';
export type userKey = keyof UserEntity;

@Entity()
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  profile_photo: string;

  @Column()
  biography?: string;

  @Column()
  name?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  location?: string;

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts?: PostEntity[];
}
