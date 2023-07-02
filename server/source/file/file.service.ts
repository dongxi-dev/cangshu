import { DBService } from '@j.l/nestjs-database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(private db: DBService) {}

  async getPage(note: DTI.PageNote) {
    const total = await this.db.file.count();
    const list = await this.db.file.findMany({
      skip: 1,
      take: 1,
    });

    return {
      total,
      list,
    };
  }

  async addOne(data: { type: number; name: string; size: number }) {
    console.log('add 99');
    return this.db.file.create({
      data,
    });
  }

  getFiles() {
    return 'files';
  }
}
