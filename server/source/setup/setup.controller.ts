import { Controller, Delete, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetupService } from './setup.service'

@ApiTags('初始化')
@Controller('setup')
export class SetupController {
  constructor(private setupService: SetupService) {}

  @ApiOperation({ summary: '初始化' })
  @Post()
  setup() {
    return this.setupService.setup()
  }

  @ApiOperation({ summary: '检查状态' })
  @Get()
  check() {
    return this.setupService.check()
  }

  @ApiOperation({ summary: '重置初始化' })
  @Delete()
  clear() {
    return this.setupService.clear()
  }
}
