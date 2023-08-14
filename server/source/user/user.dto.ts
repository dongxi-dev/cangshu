import { Prisma, User } from '@j-l/nestjs-db'
import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class AddUserDTO {
  @IsNotEmpty()
  @Length(1, 20, {
    message: '用户名长度不对',
  })
  readonly username: User['username']

  @IsNotEmpty()
  @Length(8, 20, {
    message: '密码长度不对',
  })
  readonly password: User['password']

  @Length(1, 10)
  readonly name?: User['name']

  @Length(6, 30)
  readonly email?: User['email']
}

export class UpdateUserDto extends PartialType(AddUserDTO) {}
