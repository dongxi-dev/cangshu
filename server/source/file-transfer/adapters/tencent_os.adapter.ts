import { getCredential } from 'qcloud-cos-sts';
import { ObjectStorageAdapter, StorageCredential } from './os.adapter';

export class TencentObjectStorageAdapter extends ObjectStorageAdapter {
  async getCredential(): Promise<StorageCredential> {
    const result = await getCredential({
      secretId: this.accessId,
      secretKey: this.accessKey,
      policy: {},
    });
    return {
      accessId: result.credentials.tmpSecretId,
      accessKey: result.credentials.tmpSecretKey,
      region: this.region,
      bucket: this.bucket,
      startAt: result.startTime,
      expiredAt: result.expiredTime,
      token: result.credentials.sessionToken,
    };
  }
}
