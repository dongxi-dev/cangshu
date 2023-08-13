import { Permission, Role } from '@j.l/nestjs-database'
import { PartialType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, Length } from 'class-validator'

export class AddRoleDTO {
  @IsNotEmpty()
  @Length(1, 20)
  readonly name: Role['name']

  // @IsInt()
  // readonly permissions?: Role['permissions']
}

export class UpdateRoleDto extends PartialType(AddRoleDTO) {}
