import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '@j-l/nestjs-db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { FileTransferController } from './file-transfer/file-transfer.controller';
import { FileTransferModule } from './file-transfer/file-transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule.forRoot({
      isGlobal: true,
    }),
    FileModule,
    UserModule,
    SessionModule,
    FileTransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
