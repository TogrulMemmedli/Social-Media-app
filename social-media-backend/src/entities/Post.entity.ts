import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { MediaEntity } from './Media.entity';

@Entity()
export class PostEntity extends CommonEntity {
  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany((type) => MediaEntity, (media) => media.url)
  medias: MediaEntity[];
}
