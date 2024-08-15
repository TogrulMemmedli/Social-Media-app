import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller({
  path: 'auth',
  version: 'v1',
})
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('/register')
  register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }
}
