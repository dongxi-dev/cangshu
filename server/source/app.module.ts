import { Module } from '@nestjs/common';
import { DBModule } from '@j-l/nestjs-db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    DBModule.forRoot({
      isGlobal: true,
    }),
    FileModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
