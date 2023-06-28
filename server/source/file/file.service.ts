import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getFiles() {
    return 'files';
  }
}
