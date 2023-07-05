import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ExecutionContext,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

  @Get(':id')
  getOne() {
    return {
      id: 1,
      name: '123.jpg',
      type: 1,
    };
  }

  @Put()
  addOne(@Body() body: any) {
    return this.fileService.addOne({
      type: 0,
      name: body.name || 'not name',
      size: 0,
    });
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() body: any) {
    const numberId = Number(id);
    if (!numberId) {
      return;
    }
    this.fileService.updateOne(numberId, body);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    console.log(33, id);
    const numberId = Number(id);
    if (!numberId) {
      return;
    }
    this.fileService.removeOne(numberId);
  }

  @Delete()
  removeMany() {}
}
