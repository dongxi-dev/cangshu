import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Session,
} from '@nestjs/common'
import { User } from '@j.l/nestjs-database'
import { UserService } from './user.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddUserDTO, UpdateUserDto } from './user.dto'
import { UserSession } from '../auth/auth.dto'

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '获取用户分页数据' })
  @Get()
  getPage(): Promise<User[]> {
    return this.userService.getAll()
  }

  @ApiOperation({ summary: '获取当前用户详情' })
  @Get('-')
  getSelf(@Session() session: UserSession): Promise<User> {
    return this.userService.getOne(session.userId)
  }

  @ApiOperation({ summary: '获取用户详情' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getOne(id)
  }

  @ApiOperation({ summary: '添加用户' })
  @Put()
  addOne(@Body() addUserDTO: AddUserDTO) {
    return this.userService.addOne(addUserDTO)
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDto,
  ) {
    return this.userService.updateOne(id, updateUserDTO)
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    this.userService.removeOne(id)
  }

  @ApiOperation({ summary: '永久删除用户' })
  @Delete(':id/danger')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteOne(id)
  }
}
