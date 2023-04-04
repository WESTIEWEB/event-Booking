export class FindUserBankAccountsByUserIdQuery {
  constructor(
    public readonly userId: string,
    public readonly options: {
      limit: number;
      offset: number;
      orderBy?: string;
      order?: 'ASC' | 'DESC';
    },
  ) {}
}
