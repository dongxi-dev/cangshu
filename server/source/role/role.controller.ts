import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { AddRoleDTO, UpdateRoleDto } from './role.dto'

@ApiTags('角色')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @ApiOperation({ summary: '获取角色分页' })
  @Get()
  getPage() {}

  @ApiOperation({ summary: '获取所有角色' })
  @Get('all')
  getAll() {
    return this.roleService.getAll()
  }

  @ApiOperation({ summary: '获取角色详情' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getOne(id)
  }

  @ApiOperation({ summary: '添加角色' })
  @Put()
  addOne(addOneDTO: AddRoleDTO) {
    return this.roleService.addOne(addOneDTO)
  }

  @ApiOperation({ summary: '更新角色' })
  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOneDTO: UpdateRoleDto,
  ) {
    return this.roleService.updateOne(id, updateOneDTO)
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.removeOne(id)
  }

  @ApiOperation({ summary: '永久删除角色' })
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteOne(id)
  }
}
