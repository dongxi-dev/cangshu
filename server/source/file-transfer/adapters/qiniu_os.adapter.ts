import { rs, auth } from 'qiniu';
import {
  ObjectStorageAdapterOptions,
  ObjectStorageAdapter,
} from './os.adapter';

export class TencentOSAdapter extends ObjectStorageAdapter {
  mac: auth.digest.Mac;

  constructor(options: ObjectStorageAdapterOptions) {
    super(options);
    this.mac = new auth.digest.Mac(this.accessId, this.accessKey);
  }

  getToken(): string | Promise<string> {
    const token = new rs.PutPolicy({
      scope: this.bucket,
      expires: 7200,
    }).uploadToken(this.mac);

    return token;
  }

  getURL(key: string): string | Promise<string> {
    return '';
  }
}
