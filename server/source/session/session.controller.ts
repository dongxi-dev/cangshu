import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Session,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { type Request } from 'express';
import { type Session as SessionClass } from 'express-session';

@ApiTags('会话模块')
@Controller('auth')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @ApiTags('用户登录')
  @Post()
  async login(
    @Body() data: { username: string; password: string },
    @Session() session: SessionClass,
    @Req() request: Request,
  ) {
    const user = await this.sessionService.login(data);
    (session as any).userId = user.id;
    
    // 这里暂时写一下设置会话的逻辑， 后面可能需要单独 service 服务
    // return new Promise((resolve, reject) => {
    //   session.regenerate((error) => {
    //     if (error) {
    //       return reject(error);
    //     }
    //   });
    //   (request.session as any).userId = user.id;
    //   (request.session as any).userName = user.name;

    //   request.session.save((error2) => {
    //     if (error2) {
    //       return reject(error2);
    //     }

    //     resolve(null);
    //   });
    // });
  }

  @Get('out')
  async logout(@Session() session: SessionClass) {
    return new Promise((resolve, reject) => {
      session.destroy((error) => {
        if (error) {
          reject(error);
        }
        resolve(null);
      });
    });
  }

  @Get('check')
  async check(@Session() session: SessionClass) {
    return !!(session as any).userId;
  }
}
