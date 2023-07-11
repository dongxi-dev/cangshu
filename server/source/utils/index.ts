import {
  Controller,
  DefaultValuePipe,
  ExecutionContext,
  Get,
  ParseIntPipe,
  Post,
  Query,
  createParamDecorator,
} from '@nestjs/common';
import { createHash } from 'node:crypto';

export const PageQuery = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): DTI.PageNote => {
    const request = ctx.switchToHttp().getRequest();

    const { number, size, keyword } = request.query;
    return {
      number: Number(number) || 1,
      size: Number(size) || 10,
      keyword,
      sort: '',
      order: '',
    };
  },
);

export const cryptoPassword = (password: string, salt = 'a59abbe56e') => {
  return createHash('md5').update(`${password}:${salt}`).digest('hex');
};

console.log('密码为2加密后的密码为：', cryptoPassword('2'));
