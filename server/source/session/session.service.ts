import { HttpException, Injectable } from '@nestjs/common';
import { DBService } from '@j-l/nestjs-db';
import { UserService } from '../user/user.service';
import { cryptoPassword } from '../utils';

@Injectable()
export class SessionService {
  constructor(private db: DBService, private user: UserService) {}

  async login(data: { username: string; password: string }) {
    const endPassword = cryptoPassword(data.password);
    const user = await this.db.user.findFirst({
      where: {
        username: data.username,
        password: endPassword,
      },
    });
    if (!user) {
      throw new HttpException('用户名或密码不正确', 400);
    }
    return user;
  }
}
