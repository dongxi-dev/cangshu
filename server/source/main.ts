import cookieSession from 'cookie-session'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // without micro services
  app.enableCors({ origin: true, credentials: true })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  app.use(
    cookieSession({
      name: 'session',
      keys: ['123'],
      maxAge: 10 * 1000 * 6 * 60,
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('仓鼠')
    .setDescription('一个软件资产管理系统')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)

  const url = await app.getUrl()

  console.log(url)
}

bootstrap()
