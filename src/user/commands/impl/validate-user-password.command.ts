export class ValidateUserPasswordCommand {
  constructor(
    public readonly id: string,
    public readonly password: string,
  ) {}
}
