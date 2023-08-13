import cookieSession from 'cookie-session'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // without micro services
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  app.use(
    cookieSession({
      name: 'session',
      keys: ['123'],
      maxAge: 10 * 1000,
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
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
