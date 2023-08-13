import { User } from '@j.l/nestjs-database'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class AuthLoginDTO {
  @IsNotEmpty()
  @Length(1, 20, {
    message: '用户名长度不对',
  })
  readonly username: User['username']

  @IsNotEmpty()
  @Length(1, 20, {
    message: '密码长度不对',
  })
  password: User['password']
}

export interface UserSession {
  userId?: User['id']
  time?: number
}
