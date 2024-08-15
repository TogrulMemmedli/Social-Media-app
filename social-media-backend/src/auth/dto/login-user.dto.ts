import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @Type()
  @IsString()
  @ApiProperty({ default: 'default user' })
  username: string;

  @Type()
  @ApiProperty({ default: 'Passw0rd1_!' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
  )
  password: string;
}
