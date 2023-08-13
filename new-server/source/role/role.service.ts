import { DBService, Prisma, Role } from '@j.l/nestjs-database'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AddRoleDTO, UpdateRoleDto } from './role.dto'

@Injectable()
export class RoleService {
  constructor(private db: DBService) {}

  async getPage(note: DTI.PageNote): Promise<DTI.Page<{}>> {
    const where: Prisma.RoleWhereInput = {
      OR: [{ name: { contains: note.keyword } }],
    }

    const [list, total] = await Promise.all([
      this.db.role.findMany({
        skip: note.size * (note.number - 1 >= 0 ? note.number - 1 : 0),
        take: note.size,
        where: {},
        orderBy: { createAt: 'desc' },
      }),
      this.db.role.count({ where }),
    ])

    return {
      list,
      total,
      note,
    }
  }

  getAll(): Promise<Role[]> {
    return this.db.role.findMany()
  }

  async getOne(id: Role['id']): Promise<Role> {
    const user = await this.db.role.findFirst({
      where: { id },
    })

    if (!user) {
      throw new HttpException('404', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async addOne(addOneDTO: AddRoleDTO): Promise<Role['id']> {
    const result = await this.db.role.create({
      data: addOneDTO,
    })

    return result.id
  }

  async updateOne(id: Role['id'], updateOneDTO: UpdateRoleDto): Promise<void> {
    await this.db.role.update({
      where: { id },
      data: updateOneDTO,
    })
  }

  async removeOne(id: Role['id']): Promise<void> {
    await this.db.role.update({
      where: { id },
      data: {
        removeAt: new Date().toISOString(),
      },
    })
  }

  async deleteOne(id: Role['id']): Promise<void> {
    await this.db.role.delete({
      where: { id },
    })
  }
}
