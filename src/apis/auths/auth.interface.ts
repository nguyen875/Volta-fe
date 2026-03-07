import type { User } from "../users/user.interface";

export interface RequestLoginDto {
    email: string;
    password: string;
}

export interface ResponseLoginDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RequestSignUpDto {
    email: string;
    password: string;
    confirm_password: string;
    full_name: string;
    phone: string;
}
