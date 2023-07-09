import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DBService } from '@j-l/nestjs-db';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(DBService);
  await prismaService.enableShutdownHooks(app);

  const options = new DocumentBuilder()
    .setTitle('仓鼠')
    .setDescription('一个软件资产管理系统')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(
    session({
      secret: 'keyboard cat', // 秘钥
      name: 'file-suuid', // 生成cookie的名称
      rolling: true,
      cookie: { maxAge: 60000 }, //session的存储时间
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
