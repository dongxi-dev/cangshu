import { DBService } from '@j.l/nestjs-database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(private db: DBService) {}

  async getPage(note: DTI.PageNote) {
    const total = await this.db.file.count();
    const list = await this.db.file.findMany({
      skip: note.size * (note.number - 1 >= 0 ? note.number - 1 : 0),
      take: note.size,
      orderBy: {
        createAt: 'desc',
      },
    });

    return {
      total,
      list,
      note,
    };
  }

  async addOne(data: { type: number; name: string; size: number }) {
    return this.db.file.create({
      data,
    });
  }

  getFiles() {
    return 'files';
  }
}
