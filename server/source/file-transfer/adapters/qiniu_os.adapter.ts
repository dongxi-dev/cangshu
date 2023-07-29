import { rs, auth } from 'qiniu';
import {
  ObjectStorageAdapterOptions,
  ObjectStorageAdapter,
  StorageCredential,
} from './os.adapter';

export class QiniuObjectStorageAdapter extends ObjectStorageAdapter {
  type = 'qiniu';
  protected mac: auth.digest.Mac;

  constructor(options: ObjectStorageAdapterOptions) {
    super(options);
    this.mac = new auth.digest.Mac(this.accessId, this.accessKey);
  }

  getCredential(): StorageCredential | Promise<StorageCredential> {
    const token = new rs.PutPolicy({
      scope: this.bucket,
      expires: 7200,
    }).uploadToken(this.mac);

    return {
      token,
      region: this.region,
      bucket: this.bucket,
      prefix: this.prefix,
    };
  }
}
