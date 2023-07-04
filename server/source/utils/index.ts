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
