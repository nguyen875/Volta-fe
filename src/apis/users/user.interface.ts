import type { BaseRequestParam } from "../../common/interfaces/base-requestdto.interface";

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  create_at: string;
}

export interface RequestCreateUserDto {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface RequestUpdateUserDto {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export type UserRequestParam = BaseRequestParam;
