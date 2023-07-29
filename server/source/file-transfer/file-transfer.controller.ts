import { Controller, Get, Param, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileTransferService } from './file-transfer.service';

@Controller('file-transfer')
export class FileTransferController {
  constructor(
    private fileTransferService: FileTransferService,
    private configService: ConfigService,
  ) {}

  @Get('credential')
  getToken() {
    const type = this.configService.getOrThrow('__OS_TYPE__');

    return this.fileTransferService.getStorageCredential(type);
  }
}
