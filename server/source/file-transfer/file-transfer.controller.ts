import { Controller, Get } from '@nestjs/common';
import { FileTransferService } from './file-transfer.service';

@Controller('file-transfer')
export class FileTransferController {
  constructor(private fileTransferService: FileTransferService) {}

  @Get('token')
  getToken() {
    return this.fileTransferService.getToken();
  }
}
