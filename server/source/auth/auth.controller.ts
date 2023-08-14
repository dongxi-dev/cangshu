import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Put,
  Request,
  Session,
  SetMetadata,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthLoginDTO, UserSession } from './auth.dto'

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @Put()
  @SetMetadata('no_auth', true)
  login(
    @Body() loginDTO: AuthLoginDTO,
    @Session() session: UserSession,
  ): Promise<void> {
    return this.authService.login(loginDTO, session)
  }

  @ApiOperation({ summary: '用户续签会话' })
  @Patch()
  renew(@Session() session: UserSession) {
    return this.authService.renew(session)
  }

  @ApiOperation({ summary: '退出登录' })
  @Delete()
  logout(@Request() request) {
    request.session = null
    return this.authService.logout()
  }

  @ApiOperation({ summary: '检查登录状态' })
  @Get()
  @SetMetadata('no_auth', true)
  check(@Session() session: UserSession) {
    return this.authService.check(session)
  }
}
