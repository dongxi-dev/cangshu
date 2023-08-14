import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PageQuery } from '../utils'
import { FileService } from './file.service'

@Controller('files')
@ApiTags('文件管理')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: '获取目录项分页' })
  @Get()
  async getPage(
    @PageQuery((query) => ({
      parentId: Number(query.parentId) || undefined,
    }))
    pageQuery: DTI.PageNote<{ parentId: number }>,
  ) {
    return this.fileService.getPage(pageQuery)
  }

  @ApiOperation({ summary: '获取目录项信息' })
  @Get(':id')
  getOne() {
    return {
      id: 1,
      name: '123.jpg',
      type: 1,
    }
  }

  @ApiOperation({ summary: '添加目录项' })
  @Put()
  addOne(@Body() body: any) {
    return this.fileService.addOne({
      type: body.type,
      name: body.name || 'not name',
      size: body.size,
      url: body.url,
      parentId: Number(body.parentId) || undefined,
    })
  }

  @ApiOperation({ summary: '更新目录项' })
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() body: any) {
    const numberId = Number(id)
    if (!numberId) {
      return
    }
    if (!body.name) {
      return 400
    }
    this.fileService.updateOne(numberId, {
      name: body.name,
    })
  }

  @ApiOperation({ summary: '删除目录项' })
  @Delete(':id')
  removeOne(@Param('id') id: string) {
    console.log(33, id)
    const numberId = Number(id)
    if (!numberId) {
      return
    }
    this.fileService.removeOne(numberId)
  }

  @ApiOperation({ summary: '批量删除目录项' })
  @Delete('batch')
  removeMany(@Query('idList') idList: string[]) {
    this.fileService.removeMany(
      idList.map((i) => Number(i)).filter((i) => i > 0),
    )
  }
}
