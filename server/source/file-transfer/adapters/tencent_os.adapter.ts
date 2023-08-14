import { getCredential } from 'qcloud-cos-sts';
import { ObjectStorageAdapter, StorageCredential } from './os.adapter';

export class TencentObjectStorageAdapter extends ObjectStorageAdapter {
  type = 'tencent';

  async getCredential(): Promise<StorageCredential> {
    var shortBucketName = this.bucket.substr(0, this.bucket.lastIndexOf('-'));
    var appId = this.bucket.substr(1 + this.bucket.lastIndexOf('-'));
    const result = await getCredential({
      secretId: this.accessId,
      secretKey: this.accessKey,
      policy: {
        version: '2.0',
        statement: [
          {
            action: [
              'name/cos:PutObject',
              'name/cos:PostObject',
              'name/cos:InitiateMultipartUpload',
              'name/cos:ListMultipartUploads',
              'name/cos:ListParts',
              'name/cos:UploadPart',
              'name/cos:CompleteMultipartUpload',
            ],
            effect: 'allow',
            resource: [
              'qcs::cos:' +
                this.region +
                ':uid/' +
                appId +
                ':prefix//' +
                appId +
                '/' +
                shortBucketName +
                '/*',
            ],
          },
        ],
      },
    });
    return {
      type: this.type,
      accessId: result.credentials.tmpSecretId,
      accessKey: result.credentials.tmpSecretKey,
      region: this.region,
      bucket: this.bucket,
      prefix: this.prefix,
      origin: this.origin,
      startAt: result.startTime,
      expiredAt: result.expiredTime,
      token: result.credentials.sessionToken,
    };
  }
}
