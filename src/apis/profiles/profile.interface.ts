import type { User } from "../users/user.interface";

export interface UserProfile {
  user: User;
  addresses: Address[];
}

export interface UpdateProfileDto {
  full_name?: string;
  phone?: string;
  password?: string;
}

export interface Address {
  id: number;
  user_id: number;
  label?: string;
  street: string;
  city: string;
  country: string;
  is_default: boolean;
}

export interface RequestCreateAddressDto {
  label?: string;
  street: string;
  city: string;
  country?: string;
  is_default?: boolean;
}
