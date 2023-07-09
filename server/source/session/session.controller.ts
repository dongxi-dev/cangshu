import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Session,
} from '@nestjs/common';
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
    @Req() request,
  ) {
    console.log('request.session', request.session);
    request.session.visits = '9999';
    const dataUser = await this.sessionService.verifyUser(data);
    session.userId = dataUser.id;
    session.username = dataUser.username;

    return {
      code: 0,
      msg: '登录成功',
    };
  }

  @Delete()
  async logout() {}

  @Get()
  async check() {}
}
