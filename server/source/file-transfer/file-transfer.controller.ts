import { Controller, Get, Param, Put } from '@nestjs/common';
import { FileTransferService } from './file-transfer.service';

@Controller('file-transfer')
export class FileTransferController {
  constructor(private fileTransferService: FileTransferService) {}

  @Get('token')
  getToken(@Param() type = 'qiniu') {
    return this.fileTransferService.getStorageCredential('qiniu');
  }

  @Put()
  upload() {
    // suggest user upload from browser
  }

  @Get()
  download() {
    // suggest use file's end URL
  }
}
