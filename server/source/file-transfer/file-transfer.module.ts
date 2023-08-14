import { Module } from '@nestjs/common';
import { FileTransferService } from './file-transfer.service';
import { FileTransferController } from './file-transfer.controller';

@Module({
  controllers: [FileTransferController],
  providers: [FileTransferService],
})
export class FileTransferModule {}
