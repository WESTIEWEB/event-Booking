/* eslint-disable import/no-extraneous-dependencies */
import {
  CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IUserService } from '../interfaces';
import { UserProviders } from '../user.providers';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(
    @Inject(UserProviders.UserService)
    private readonly userService: IUserService,
  ) {}

  private async validateRequest(request: Request) {
    const verified = await this.userService.isUserEmailVerified(request.user.id);
    if (!verified) {
      throw new ForbiddenException('Email is not verified');
    }

    return true;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = <Request>context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
}
