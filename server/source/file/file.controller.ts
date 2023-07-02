import {
  Body,
  Controller,
  DefaultValuePipe,
  ExecutionContext,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  createParamDecorator,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageQuery } from 'source/utils';
import { FileService } from './file.service';

@Controller('files')
@ApiTags('文件管理')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  async getPage(@PageQuery() pageQuery: DTI.PageNote) {
    return this.fileService.getPage(pageQuery);
  }

  @Put()
  addOne(@Body() body: any) {
    console.log(333, body);
    return this.fileService.addOne({
      type: 0,
      name: body.name,
      size: 0,
    });
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
