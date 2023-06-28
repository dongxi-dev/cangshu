import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileService } from 'source/file/file.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FileService],
})
export class UserModule {}
