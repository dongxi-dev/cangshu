import { Injectable } from '@nestjs/common'
import { DBService } from '@j-l/nestjs-db'
import { AuthLoginDTO, UserSession } from './auth.dto'
import { encryptPassword } from '../shared/utils'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private dbService: DBService,
    private configService: ConfigService,
  ) {}

  async login(loginDTO: AuthLoginDTO, session: UserSession): Promise<void> {
    const user = await this.dbService.user.findFirst({
      where: {
        username: loginDTO.username,
      },
    })

    if (!user) {
      throw new Error('用户名不存在')
    }

    const salt = this.configService.get<string | undefined>(
      'CRYPTO_PASSWORD_SALT',
    )

    if (encryptPassword(loginDTO.password, salt) !== user.password) {
      throw new Error('密码错误')
    }

    session.userId = user.id
    session.time = Date.now()
  }

  async logout(): Promise<void> {}

  async check(session: UserSession): Promise<{ isValid: boolean }> {
    // 0 有效 1 没有凭据 2 凭据无效 3 凭据过期
    return {
      isValid: !!session.userId,
    }
  }

  async renew(session: UserSession): Promise<void> {
    if (session.userId) {
      return
    }
    session.time = Date.now()
  }
}
