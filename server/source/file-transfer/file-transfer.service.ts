import { Injectable } from '@nestjs/common';
import { QiniuObjectStorageAdapter } from './adapters/qiniu_os.adapter';
import { TencentObjectStorageAdapter } from './adapters/tencent_os.adapter';

const adapterMap = {
  qiniu: QiniuObjectStorageAdapter,
  tencent: TencentObjectStorageAdapter,
};

@Injectable()
export class FileTransferService {
  getStorageCredential(type: 'qiniu' | 'tencent') {
    return new adapterMap[type]({
      accessId: '',
      accessKey: '',
      region: '',
      bucket: '',
      prefix: '',
    }).getCredential();
  }
}
