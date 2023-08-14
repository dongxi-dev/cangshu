import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PermissionService } from './permission.service'
import { AddPermissionDTO, UpdatePermissionDto } from './permission.dto'

@ApiTags('权限')
@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @ApiOperation({ summary: '获取权限分页' })
  @Get()
  getPage() {}

  @ApiOperation({ summary: '获取所有权限' })
  @Get('all')
  getAll() {
    return this.permissionService.getAll()
  }

  @ApiOperation({ summary: '获取权限详情' })
  @Get(':code')
  getOne(@Param('code') code: string) {
    return this.permissionService.getOne(code)
  }

  @ApiOperation({ summary: '添加权限' })
  @Put()
  addOne(@Body() addOneDTO: AddPermissionDTO) {
    return this.permissionService.addOne(addOneDTO)
  }

  @ApiOperation({ summary: '更新权限' })
  @Patch(':code')
  updateOne(
    @Param('code') code: string,
    @Body() updateOneDTO: UpdatePermissionDto,
  ) {
    return this.permissionService.updateOne(code, updateOneDTO)
  }

  @ApiOperation({ summary: '删除权限' })
  @Delete(':code')
  removeOne(@Param('code') code: string) {
    return this.permissionService.removeOne(code)
  }

  @ApiOperation({ summary: '永久删除权限' })
  @Delete(':code')
  deleteOne(@Param('code') code: string) {
    return this.permissionService.deleteOne(code)
  }
}
