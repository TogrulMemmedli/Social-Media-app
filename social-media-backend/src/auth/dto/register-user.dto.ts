import { Type } from 'class-transformer';
import { LoginUserDto } from './login-user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto extends LoginUserDto {
  @Type()
  @IsString()
  @ApiProperty({
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
  })
  profile_photo: string;

  @Type()
  @IsString()
  @ApiProperty({
    default: '',
  })
  biography?: string;

  @Type()
  @IsString()
  @ApiProperty({
    default: 'name',
  })
  name?: string;

  @Type()
  @IsString()
  @ApiProperty({ default: false })
  isVerified: boolean;

  @Type()
  @IsString()
  @ApiProperty({
    default: 'location',
  })
  location?: string;
}
