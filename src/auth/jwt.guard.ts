import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const req = context.switchToHttp().getRequest();
    // if (process.env.NODE_ENV !== 'production') {
    //   req.user = {
    //     id: '1',
    //     name: 'test_user',
    //   };
    //
    //   return true;
    // }

    return super.canActivate(context);
  }
}
