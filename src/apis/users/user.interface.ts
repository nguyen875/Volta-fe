export interface User {
    id: number;
    email: string;
    passwordHash: string;   // stored hash — never send to views
    fullName: string;
    phone: string;
    createdAt: string;
}

export interface RequestCreateUserDto {
    email: string;
    password: string;
    fullName: string;
    phone: string;
}

export interface RequestUpdateUserDto {
    email: string;
    password: string;
    fullName: string;
    phone: string;
}