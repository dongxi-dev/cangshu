import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { UserService } from 'source/user/user.service';

@ApiTags('用户登录模块')
@Controller('auth')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  @ApiTags('登录用户')
  @Post('/login')
  async login(
    @Body() data: { username: string; password: string },
    @Session() session,
  ) {
    const dataUser = await this.sessionService.verifyUser(data);
    session.uerid = dataUser.id;
    session.username = dataUser.username;

    return {
      code: 0,
      msg: '登录成功',
    };
  }
}
