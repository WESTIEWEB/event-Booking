import {
  Body, Controller, Inject, Post,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/common';
import { BaseController } from 'src/common/controllers';
import { AuthenticationProviders } from '../authentication.providers';
import { LoginWithEmailDto } from '../dtos';
import { IEmailAuthenticationService } from '../interfaces';
import { loginSchema } from '../request-schemas';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    @Inject(AuthenticationProviders.EmailAuthenticationService)
    private readonly emailAuthenticationService: IEmailAuthenticationService,
  ) {
    super();
  }

  @Post('login/email')
  async loginWithEmail(
    @Body(
      new JoiValidationPipe(loginSchema),
    ) input: LoginWithEmailDto,
  ) {
    const token = await this.emailAuthenticationService.authenticate(input.email, input.password);

    return this.success({ token });
  }
}
