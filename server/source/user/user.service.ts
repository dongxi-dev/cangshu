import { Injectable, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { DBService } from '@j-l/nestjs-db';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  getById() {
    return 'user service return ';
  }

  check() {
    return 'check';
  }

  getOne(id: number) {
    return this.getUser({ id });
  }

  getUsers() {
    return this.db.user.findMany({});
  }

  createOne(): Promise<User> {
    return this.db.user.create({
      data: {
        username: 'admin',
        password: 'admin',
        name: 'Alice' + Math.random(),
        email: Math.random() + 'alice@prisma.io',
      },
    });
  }

  verifyUser(@Param() data: { username: string; password: string }) {
    // 其他验证逻辑可以在这里加
    return this.getUser({ username: data.username });
  }

  private async getUser(@Param() where: { id?: number; username?: string }) {
    return this.db.user.findUnique({ where });
  }
}
