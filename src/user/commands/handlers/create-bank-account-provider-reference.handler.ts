import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AppLogger, InjectLogger } from 'src/logging';
import { IPaystackService, PaystackProviders } from 'src/paystack';
import { IUserBankAccountRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { CreateBankAccountProviderReferenceCommand } from '../impl';

@Injectable()
@CommandHandler(CreateBankAccountProviderReferenceCommand)
export class CreateBankAccountProviderReferenceHandler implements ICommandHandler<CreateBankAccountProviderReferenceCommand, void> {
  constructor(
    @Inject(UserProviders.UserBankAccountRepository)
    private readonly repository: IUserBankAccountRepository,
    @Inject(PaystackProviders.PaystackService)
    private readonly paystackService: IPaystackService,
    private readonly publisher: EventPublisher,
    @InjectLogger(CreateBankAccountProviderReferenceHandler.name)
    private readonly logger: AppLogger,
  ) {}

  async execute(command: CreateBankAccountProviderReferenceCommand): Promise<void> {
    const { id } = command;
    const domain = await this.repository.findById(id);

    if (!domain) {
      throw new Error('User bank account not found');
    }

    const { accountNumber, bankCode, accountName } = domain;
    const userBankAccount = this.publisher.mergeObjectContext(domain);

    try {
      const { data } = await this.paystackService.createTransferRecipient({
        account_number: accountNumber,
        bank_code: bankCode,
        name: accountName,
        type: 'nuban',
        currency: 'NGN',
      });

      const providerTransferReference = data.recipient_code;
      userBankAccount.update({ providerTransferReference });
      this.logger.debug({ providerTransferReference, userBankAccount }, 'Created bank account provider reference successfully');

      await this.repository.save(userBankAccount);

      userBankAccount.commit();
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      this.logger.error({
        err: error,
        response: error?.response?.data,
      }, `Error creating bank account provider reference: ${message}`);
      throw error;
    }
  }
}
