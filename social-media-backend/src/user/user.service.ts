import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, userKey } from 'src/entities/user.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async findOne(where?: FindOptionsWhere<UserEntity>, select?: userKey[]) {
    return this.userRepo.findOne({ where, select });
  }
  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll(where?: FindOptionsWhere<UserEntity>, select?: userKey[]) {
    return this.userRepo.find({ where, select });
  }

  async create(params: Partial<UserEntity>) {
    let checkUsername = await this.findOne({ username: params.username });
    if (checkUsername)
      throw new ConflictException('This username already taken');
    let user = this.userRepo.create(params);
    await user.save();
    return user;
  }
  async update() {}

  async delete() {}
}
