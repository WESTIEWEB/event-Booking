import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { AuthenticatedGuard, UserGuard } from 'src/authentication/guards';
import { JoiValidationPipe } from 'src/common';
import { BaseController } from 'src/common/controllers';
import { EventListingProviders, IEventListingService } from 'src/event-listing';
import { CreateUserBankAccountInputDto, CreateUserDto } from '../dtos';
import { EmailVerifiedGuard } from '../guards';
import { IUserService } from '../interfaces';
import { createUserBankAccountSchema, verifyEmailSchema } from '../request-schemas';
import { UserProviders } from '../user.providers';

@Controller('users')
export class UserController extends BaseController {
  constructor(
    @Inject(UserProviders.UserService)
    private readonly userService: IUserService,
    @Inject(EventListingProviders.EventListingService)
    private readonly eventListingService: IEventListingService,
  ) {
    super();
  }

  @Post()
  async createUser(
    @Body() params: CreateUserDto,
  ) {
    const user = await this.userService.create(params);
    return this.success({ user });
  }

  @Post('verify/email')
  async verifyEmail(
    @Body(new JoiValidationPipe(verifyEmailSchema)) input: { email: string; token: string },
  ) {
    const { email, token } = input;
    const jwt = await this.userService.verifyEmail(email, token);
    return this.success({ token: jwt });
  }

  @Get('me/event-listings')
  @UseGuards(AuthenticatedGuard, UserGuard)
  async getMyEventListings(
    @Req() req: Request,
    @Query('limit') limit: number = 10,
    @Query('page') offset: number = 0,
    @Query('orderBy') orderBy: string = 'createdAt',
    @Query('order') order: string = 'DESC',
  ) {
    const listings = await this.eventListingService.findByUserId({
      userId: req.user.id,
      limit,
      offset,
      orderBy,
      order: <any>order,
    });
    return this.success({ ...listings });
  }

  @Get('me/bank-accounts')
  @UseGuards(AuthenticatedGuard, UserGuard)
  async getUserBankAccounts(
    @Param('id') userId: string,
    @Query('limit') limit: number = 10,
    @Query('page') offset: number = 0,
    @Query('orderBy') orderBy: string = 'createdAt',
    @Query('order') order: string = 'DESC',
  ) {
    const bankAccounts = await this.userService.findUserBankAccountByUserId(userId, {
      limit,
      offset,
      orderBy,
      order: <any>order,
    });
    return this.success({ ...bankAccounts });
  }

  @Get(':id/event-listings')
  async getUserEventListings(
    @Param('id') userId: string,
    @Query('limit') limit: number = 10,
    @Query('page') offset: number = 0,
    @Query('orderBy') orderBy: string = 'createdAt',
    @Query('order') order: string = 'DESC',
  ) {
    const listings = await this.eventListingService.findByUserId({
      userId,
      limit,
      offset,
      orderBy,
      order: <any>order,
    });
    return this.success({ ...listings });
  }

  @Post(':id/bank-accounts')
  @UseGuards(AuthenticatedGuard, UserGuard, EmailVerifiedGuard)
  async createUserBankAccount(
    @Req() req: Request,
    @Body(new JoiValidationPipe(createUserBankAccountSchema)) input: CreateUserBankAccountInputDto,
  ) {
    const bankAccount = await this.userService.createUserBankAccount(
      req.user.id,
      input,
    );

    return this.success({ bankAccount });
  }
}
