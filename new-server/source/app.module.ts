import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { DBModule } from '@j.l/nestjs-database'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module'
import { SetupModule } from './setup/setup.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist'),
      exclude: ['/api/(.*)'],
    }),
    DBModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    SetupModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
