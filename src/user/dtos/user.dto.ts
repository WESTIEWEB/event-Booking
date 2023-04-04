export interface UserDto {
  id: string;
  email: string;
  dob?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
