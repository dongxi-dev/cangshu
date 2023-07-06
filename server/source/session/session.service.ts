import { HttpException, Injectable } from '@nestjs/common';
import { DBService } from '@j-l/nestjs-db';

@Injectable()
export class SessionService {
  constructor(private db: DBService) {}

  async verifyUser(data) {
    // const dataUser = await this.usersRepository.findOne({ where: data });
    const dataUser = {
      id: 11000,
      username: 'php',
    };
    if (!dataUser) {
      throw new HttpException('用户名或密码不正确', 200);
    } else {
      return dataUser;
    }
  }
}
