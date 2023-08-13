import { DBService, Permission, Prisma } from '@j.l/nestjs-database'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AddPermissionDTO, UpdatePermissionDto } from './permission.dto'

@Injectable()
export class PermissionService {
  constructor(private db: DBService) {}

  async getPage(note: DTI.PageNote): Promise<DTI.Page<{}>> {
    const where: Prisma.PermissionWhereInput = {
      OR: [
        { name: { contains: note.keyword } },
        { code: { contains: note.keyword } },
      ],
    }

    const [list, total] = await Promise.all([
      this.db.permission.findMany({
        skip: note.size * (note.number - 1 >= 0 ? note.number - 1 : 0),
        take: note.size,
        where: {},
        orderBy: { createAt: 'desc' },
      }),
      this.db.permission.count({ where }),
    ])

    return {
      list,
      total,
      note,
    }
  }

  getAll(): Promise<Permission[]> {
    return this.db.permission.findMany()
  }

  async getOne(code: Permission['code']): Promise<Permission> {
    const user = await this.db.permission.findFirst({
      where: { code },
    })

    if (!user) {
      throw new HttpException('404', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async addOne(addOneDTO: AddPermissionDTO): Promise<Permission['code']> {
    const result = await this.db.permission.create({
      data: addOneDTO,
    })

    return result.code
  }

  async updateOne(
    code: Permission['code'],
    updateOneDTO: UpdatePermissionDto,
  ): Promise<void> {
    await this.db.permission.update({
      where: { code },
      data: updateOneDTO,
    })
  }

  async removeOne(code: Permission['code']): Promise<void> {
    await this.db.permission.update({
      where: { code },
      data: {
        removeAt: new Date().toISOString(),
      },
    })
  }

  async deleteOne(code: Permission['code']): Promise<void> {
    await this.db.permission.delete({
      where: { code },
    })
  }
}
