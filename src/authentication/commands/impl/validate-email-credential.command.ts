export class ValidateEmailCredentialCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
