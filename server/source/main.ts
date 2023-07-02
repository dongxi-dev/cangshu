import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DBService } from '@j.l/nestjs-database';

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

  await app.listen(3000);
}
bootstrap();
