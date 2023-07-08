import { HttpException, Injectable } from '@nestjs/common';
import { DBService } from '@j-l/nestjs-db';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionService {
  constructor(private db: DBService, private user: UserService) {}

  async verifyUser(data) {
    const dataUser = await this.user.verifyUser(data);

    if (!dataUser) {
      throw new HttpException('用户名或密码不正确', 200);
    } else {
      return dataUser;
    }
  }
}
