import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DBService, User, Prisma } from '@j-l/nestjs-db'
import { AddUserDTO, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  getAll(): Promise<User[]> {
    return this.db.user.findMany()
  }

  async getPage(note: DTI.PageNote): Promise<DTI.Page<{}>> {
    const where: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: note.keyword } },
        { username: { contains: note.keyword } },
        { email: { contains: note.keyword } },
      ],
    }

    const [list, total] = await Promise.all([
      this.db.user.findMany({
        skip: note.size * (note.number - 1 >= 0 ? note.number - 1 : 0),
        take: note.size,
        where: {},
        orderBy: { createAt: 'desc' },
      }),
      this.db.user.count({ where }),
    ])

    return {
      list,
      total,
      note,
    }
  }

  async getOne(id: number): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { id },
    })

    if (!user) {
      throw new HttpException('404', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async addOne(addUserDTO: AddUserDTO): Promise<number> {
    const result = await this.db.user.create({
      data: addUserDTO,
    })

    return result.id
  }

  async updateOne(id: number, updateUserDTO: UpdateUserDto): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: updateUserDTO,
    })
  }

  async removeOne(id: number): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: {
        removeAt: new Date().toISOString(),
      },
    })
  }

  async deleteOne(id: number): Promise<void> {
    await this.db.user.delete({
      where: { id },
    })
  }
}
