import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const noAuthClass = this.reflector.get<boolean>(
      'no_auth',
      context.getClass(),
    )
    if (noAuthClass) {
      return true
    }

    const noAuthHandler = this.reflector.get<boolean>(
      'no_auth',
      context.getHandler(),
    )
    if (noAuthHandler) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    return !!request?.session?.userId
  }
}
