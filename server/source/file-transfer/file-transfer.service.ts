import { Injectable } from '@nestjs/common';
import { rs, auth } from 'qiniu';
import { ACCESS_KEY, BUCKET_NAME, SECRET_KEY } from '../constants';
import { getCredential } from 'qcloud-cos-sts';

const mac = new auth.digest.Mac(ACCESS_KEY, SECRET_KEY);

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
