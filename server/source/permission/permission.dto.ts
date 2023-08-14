import { Permission } from '@j-l/nestjs-db'
import { PartialType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, Length } from 'class-validator'

export class AddPermissionDTO {
  @IsNotEmpty()
  @Length(1, 20, {
    message: 'code 长度不对',
  })
  readonly code: Permission['code']

  @IsNotEmpty()
  @Length(1, 20)
  readonly name: Permission['name']

  @IsInt()
  readonly type?: Permission['type']
}

export class UpdatePermissionDto extends PartialType(AddPermissionDTO) {}
