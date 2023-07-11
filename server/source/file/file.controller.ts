import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ExecutionContext,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Session,
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
  async getPage(@PageQuery() pageQuery: DTI.PageNote, @Session() session) {
    console.log('session.userId', session.userId);
    if (!session.userId) {
      throw new HttpException(`用户未登录`, 401);
    }
    return this.fileService.getPage(pageQuery);
  }

  @Get(':id')
  getOne(@Session() session) {
    if (!session.uerid) {
      throw new HttpException(`用户未登录`, 401);
    }
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
    if (!body.name) {
      return 400;
    }
    this.fileService.updateOne(numberId, {
      name: body.name,
    });
  }

  @Delete('batch')
  removeMany(@Query('idList') idList: string) {
    // this.fileService.removeMany([])
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
}
