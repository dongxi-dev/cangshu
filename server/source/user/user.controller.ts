import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('create')
  createUser() {
    return this.userService.createOne();
  }

  @ApiTags('user')
  @Get(':id')
  getById(@Param() param) {
    return this.userService.getById();
    return 'get one' + param.id;
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
