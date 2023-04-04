export class VerifyUserEmailCommand {
  constructor(
    public readonly email: string,
    public readonly token: string,
  ) {}
}
