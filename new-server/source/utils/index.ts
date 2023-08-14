import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const PageQuery = createParamDecorator(
  (
    getExtra: undefined | ((query: any) => object),
    ctx: ExecutionContext,
  ): DTI.PageNote => {
    const request = ctx.switchToHttp().getRequest()

    const { number, size, keyword } = request.query
    return {
      number: Number(number) || 1,
      size: Number(size) || 10,
      keyword,
      sort: '',
      order: '',
      ...getExtra?.(request.query),
    }
  },
)
