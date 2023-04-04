export interface CompletePasswordResetDto {
  email: string;
  password: string;
  resetToken: string;
}
