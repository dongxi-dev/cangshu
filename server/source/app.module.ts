import { join } from 'node:path'
import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { DBModule } from '@j.l/nestjs-database'
import { AuthGuard } from './auth/auth.guard'
import { SetupModule } from './setup/setup.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module'
import { FileModule } from './file/file.module'
import { FileTransferModule } from './file-transfer/file-transfer.module'

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
    FileModule,
    FileTransferModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
