import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FileService } from '../file/file.service';

@ApiTags('用户模块')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private fileService: FileService,
  ) {}

  @ApiTags('user')
  @Get('create')
  createUser() {
    return this.userService.createOne();
  }

  @ApiTags('user')
  @Get(':id')
  getUser(@Param() param) {
    return this.userService.getOne(param);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

}
