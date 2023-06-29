import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById() {
    return 'user service return ';
  }

  check() {
    return 'check';
  }

  getUsers() {
    return this.prisma.user.findMany({});
  }

  createOne(): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: '' + Math.random(),
        password: '' + Math.random(),
        name: 'Alice' + Math.random(),
        email: Math.random() + 'alice@prisma.io',
      },
    });
  }
}
