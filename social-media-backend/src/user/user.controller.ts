import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller({
  path: 'users',
  version: 'v1',
})
@ApiTags('User')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Get('')
  list() {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Get('/profile/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  myProfile(@Req() req: any) {
    console.log('Request is:', req);
    return this.userService.findById(req.userId);
  }
}
