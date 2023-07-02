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

  @Get('files')
  getFiles() {
    return this.fileService.getFiles();
  }

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

  @ApiTags('登录用户')
  @Post('/login')
  login(@Body() createCatDto: { userName: string; password: string }) {
    return this.userService.verifyUser(createCatDto);
  }
}
