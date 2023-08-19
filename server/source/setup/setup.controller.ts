import { Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetupService } from './setup.service'

@ApiTags('系统')
@Controller('system')
export class SetupController {
  constructor(private setupService: SetupService) {}

  @ApiOperation({ summary: '获取系统信息、配置' })
  @Get()
  getInfo() {
    return {
      name: '测试系统',
      logo: 'logo',
    }
  }

  @ApiOperation({ summary: '更新系统信息、配置' })
  @Post()
  updateInfo() {}

  @ApiOperation({ summary: '系统初始化' })
  @Post('setup')
  setup() {
    return this.setupService.setup()
  }

  @ApiOperation({ summary: '检查系统安装状态' })
  @Get('setup')
  check() {
    return this.setupService.check()
  }

  @ApiOperation({ summary: '重置系统' })
  @Delete('setup')
  clear() {
    return this.setupService.clear()
  }
}
