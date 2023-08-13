import { Injectable } from '@nestjs/common'

@Injectable()
export class SetupService {
  constructor() {}

  async setup() {
    // 1. 删除所有的数据库 2. 存储初始化状态和信息到磁盘 3. 初始化相关表和数据

    await this.check()

    await this.clear()

    // 配置信息 1. 管理员账号密码  2. 对象存储配置
    // user 表创建用户 配置文件录入
  }

  check() {
    // 查询相关磁盘和数据库是否有数据
  }

  clear() {
    // 1. 删除所有的数据库
  }
}
