export interface RequestLoginDto {
  email: string;
  password: string;
}

export interface RequestSignUpDto {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone: string;
}
