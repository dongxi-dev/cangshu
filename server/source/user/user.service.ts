import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getById() {
    return 'user service return ';
  }

  check() {
    return 'check';
  }
}
