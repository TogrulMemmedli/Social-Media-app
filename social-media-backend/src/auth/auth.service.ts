import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepo: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(params: RegisterUserDto) {
    let user = await this.authRepo.findOneBy({ username: params.username });
    if (user)
      throw new HttpException(
        'This Username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    let result = this.authRepo.create(params).save();
    return result;
  }
  async login(params: LoginUserDto) {
    let user = await this.userService.findOne({ username: params.username }, [
      'id',
      'username',
      'password',
    ]);
    if (!user)
      throw new HttpException(
        'Username or Password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    let checkPassword = user.password == params.password;
    if (!checkPassword)
      throw new HttpException(
        'Username or Password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    let token = this.jwtService.sign({ userId: user.id });

    return {
      status: true,
      user,
      token,
    };
  }
}
