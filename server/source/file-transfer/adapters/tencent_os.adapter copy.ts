import { getCredential } from 'qcloud-cos-sts';
import { ObjectStorageAdapter } from './os.adapter';

export class QiniuOSAdapter extends ObjectStorageAdapter {
  async getToken() {
    const result = await getCredential({
      secretId: this.accessId,
      secretKey: this.accessKey,
      policy: {},
    });
    return '';
  }

  getURL(key: string): string | Promise<string> {
    return '';
  }
}
