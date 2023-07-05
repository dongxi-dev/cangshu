import { DBService } from '@j-l/nestjs-db';
import { Injectable } from '@nestjs/common';
import { FilePayload } from '@j-l/nestjs-db';

@Injectable()
export class FileService {
  constructor(private db: DBService) {}

  async getPage(note: DTI.PageNote<{ parentId?: number }>) {
    const where = {
      parentId: {
        equals: note.parentId,
      },
      name: {
        contains: note.keyword,
      },
      // 查询已删除的
      removeAt: {
        equals: null,
      },
    };
    const [list, total] = await Promise.all([
      this.db.file.findMany({
        skip: note.size * (note.number - 1 >= 0 ? note.number - 1 : 0),
        take: note.size,
        where,
        orderBy: {
          // [note.sort]: note.order,
          createAt: 'desc',
        },
        include: {
          children: {
            include: {
              children: true, // 嵌套有问题
            },
          },
        },
      }),
      this.db.file.count({ where }),
    ]);

    return {
      total,
      list,
      note,
    };
  }

  async addOne(data: {
    type: number;
    name: string;
    size?: number;
    url?: string;
  }) {
    return this.db.file.create({
      data: {
        type: data.type,
        name: data.name,
        size: data.size,
        url: data.url,
        // createBy:
        // updateBy:
      },
    });
  }

  async getOne(id: number) {
    return this.db.file.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
  }

  async updateOne(
    id: number,
    data: { name?: string; size?: number; parentId?: number },
  ) {
    return this.db.file.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        size: data.size,
        parentId: data.parentId,
      },
    });
  }

  async removeOne(id: number) {
    return this.db.file.update({
      where: {
        id,
      },
      data: {
        removeAt: new Date().toISOString(),
        // removeBy:
      },
    });
  }

  async removeMany(idList: number[]) {
    return this.db.file.updateMany({
      where: {
        id: {
          in: idList,
        },
      },
      data: {
        removeAt: Date(),
        // removeBy:
      },
    });
  }

  async deleteOne(id: number) {
    return this.db.file.delete({
      where: { id },
    });
  }

  async deleteMany(idList: number[]) {
    return this.db.file.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
  }
}
