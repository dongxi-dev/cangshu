import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      type: 'qiniuyun',
    };
    return 'Hello World! 333';
  }
}
