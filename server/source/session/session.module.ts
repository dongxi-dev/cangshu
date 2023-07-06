import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserService } from 'source/user/user.service';
@Module({
  controllers: [SessionController],
  providers: [SessionService, UserService],
})
export class SessionModule {}
