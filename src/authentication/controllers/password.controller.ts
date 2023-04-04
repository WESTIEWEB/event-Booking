import {
  Body, Controller, Inject, Post,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/common';
import { BaseController } from 'src/common/controllers';
import { AuthenticationProviders } from '../authentication.providers';
import { CompletePasswordResetDto } from '../dtos';
import { IPasswordService } from '../interfaces';
import { completePasswordResetSchema } from '../request-schemas';

@Controller('passwords')
export class PasswordController extends BaseController {
  constructor(
    @Inject(AuthenticationProviders.PasswordService)
    private readonly passwordService: IPasswordService,
  ) {
    super();
  }

  @Post('reset')
  async requestPasswordReset(
    @Body() input: any,
  ) {
    await this.passwordService.createPasswordReset(input.email);
    return this.success({
      message: 'An email has been sent to your email address with a link to reset your password',
    });
  }

  @Post('reset/complete')
  async completePasswordReset(
    @Body(new JoiValidationPipe(completePasswordResetSchema)) input: CompletePasswordResetDto,
  ) {
    await this.passwordService.createPassword(input);
    return this.success({
      message: 'Your password has been reset',
    });
  }
}
