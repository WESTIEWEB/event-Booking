export interface IPasswordService {
  createPassword(input: any): Promise<boolean>;
  createPasswordReset(email: string): Promise<boolean>;
}
