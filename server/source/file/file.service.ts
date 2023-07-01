import { DBService } from '@j.l/nestjs-database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor(private db: DBService) {}

  getPage() {
    this.db.file.findMany({
      skip: 1,
      take: 1,
    });
  }

  getFiles() {
    return 'files';
  }
}
