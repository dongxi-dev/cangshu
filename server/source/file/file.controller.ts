import {
  Controller,
  DefaultValuePipe,
  ExecutionContext,
  Get,
  ParseIntPipe,
  Post,
  Query,
  createParamDecorator,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageQuery } from 'source/utils';

@Controller('files')
@ApiTags('文件管理')
export class FileController {
  @Get()
  getPage(@PageQuery() pageQuery: DTI.PageNote) {
    console.log(323, pageQuery);
    return {
      list: [],
      query: pageQuery,
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
