import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { PostEntity } from './post.entity';

@Entity()
export class MediaEntity extends CommonEntity {
  @Column()
  url: string;

  @ManyToOne(() => PostEntity, (post) => post.medias)
  post: PostEntity;
}
