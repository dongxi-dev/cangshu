import { Injectable } from '@nestjs/common';
import { rs, auth } from 'qiniu';
import { ACCESS_KEY, BUCKET_NAME, SECRET_KEY } from '../constants';

const mac = new auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

interface OSAdapter {
  new (options: {
    accessId: string;
    accessKey: string;
    region: string;
    bucket: string;
    basePath: string;
  }): any;
  accessId: string;
  getToken(): string | Promise<string>;
  getURL(key: string): string | Promise<string>;
}

class TencentOSAdapter implements OSAdapter {
  accessId: string;

  constructor(options: {
    accessId: string;
    accessKey: string;
    region: string;
    bucket: string;
    basePath: string;
  }) {
    this.accessId = options.accessId;
  }

  getToken(): string | Promise<string> {
    return '';
  }

  getURL(key: string): string | Promise<string> {
    return '';
  }
}

@Injectable()
export class FileTransferService {
  getToken() {
    const token = new rs.PutPolicy({
      scope: BUCKET_NAME,
      expires: 7200,
    }).uploadToken(mac);

    return { token };
  }
}
