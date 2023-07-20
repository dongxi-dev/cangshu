import { createHash } from 'node:crypto';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PASSWORD_SALT } from '../constants';

export const PageQuery = createParamDecorator(
  (
    getExtra: undefined | ((query: any) => object),
    ctx: ExecutionContext,
  ): DTI.PageNote => {
    const request = ctx.switchToHttp().getRequest();

    const { number, size, keyword } = request.query;
    return {
      number: Number(number) || 1,
      size: Number(size) || 10,
      keyword,
      sort: '',
      order: '',
      ...getExtra?.(request.query),
    };
  },
);

export const cryptoPassword = (password: string, salt = PASSWORD_SALT) => {
  return createHash('md5').update(`${password}:${salt}`).digest('hex');
};

console.log('密码为2加密后的密码为：', cryptoPassword('2'));
