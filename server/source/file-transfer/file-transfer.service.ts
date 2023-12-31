import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QiniuObjectStorageAdapter } from './adapters/qiniu_os.adapter';
import { TencentObjectStorageAdapter } from './adapters/tencent_os.adapter';

const adapterMap = {
  qiniu: QiniuObjectStorageAdapter,
  tencent: TencentObjectStorageAdapter,
};

@Injectable()
export class FileTransferService {
  constructor(private configService: ConfigService) {}

  getStorageCredential(type: 'qiniu' | 'tencent') {
    const accessId = this.configService.get('__OS_ACCESS_ID__');
    const accessKey = this.configService.get('__OS_ACCESS_KEY__');
    const region = this.configService.get('__OS_REGION__');
    const bucket = this.configService.get('__OS_BUCKET__');
    const prefix = this.configService.get('__OS_PREFIX__');
    const origin = this.configService.get('__OS_ORIGIN__');
    return new adapterMap[type]({
      accessId,
      accessKey,
      region,
      bucket,
      prefix,
      origin,
    }).getCredential();
  }
}
