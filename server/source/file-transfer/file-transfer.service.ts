import { Injectable } from '@nestjs/common';

import * as qiniu from 'qiniu';

const accessKey = 'AT3hlQI24ivp7V3E6yUBQYWa2mkmSlZQOmEnYEU3';
const secretKey = 'TKYRx1MBfwlxgoAgoYubEdAQuEM3Y1c140vKiiol';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// const bucket = 'test-cangshu';
const bucket = 'www-jiluo-cc';

@Injectable()
export class FileTransferService {
  getToken() {
    const token = new qiniu.rs.PutPolicy({
      scope: bucket,
      expires: 7200,
    }).uploadToken(mac);
    return { token };
  }
}
