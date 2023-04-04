import {
  CanActivate, ExecutionContext, Inject, Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationProviders } from '../authentication.providers';
import { ITokenService } from '../interfaces';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    @Inject(AuthenticationProviders.TokenService)
    private readonly tokenService: ITokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = <Request>context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const authorization = <string>request.headers['authorization'] || <string>request.headers['Authorization'];

    if (!authorization) {
      return false;
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    this.tokenService.verifyToken(token);

    return true;
  }
}
