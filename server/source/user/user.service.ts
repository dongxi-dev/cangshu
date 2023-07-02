import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DBService } from '@j.l/nestjs-database';

@Injectable()
export class UserService {
  constructor(private db: DBService) {}

  getById() {
    return 'user service return ';
  }

  check() {
    return 'check';
  }

  getOne(id: string) {
    return this.db.user.findMany({ id });
  }

  getUsers() {
    return this.db.user.findMany({});
  }

  createOne(): Promise<User> {
    return this.db.user.create({
      data: {
        username: '' + Math.random(),
        password: '' + Math.random(),
        name: 'Alice' + Math.random(),
        email: Math.random() + 'alice@prisma.io',
      },
    });
  }
}
