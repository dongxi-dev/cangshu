import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('文件管理')
export class FileController {
  @Get()
  getPage() {
    return {
      list: [],
      query: {},
      total: 1,
    };
  }

  @Get(':id')
  getOne() {
    return {
      id: 1,
      name: '123.jpg',
      type: 1,
    };
  }

  @Post(':id')
  updateOne() {
    return '';
  }
}
