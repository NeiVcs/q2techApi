export interface UpdateUserPasswordInputDTO {
  email: string;
  password?: string;
  newPassword: string;
  code?: string;
}
    
    