export interface IEmailAuthenticationService {
  authenticate(email: string, password: string): Promise<string>;
}
