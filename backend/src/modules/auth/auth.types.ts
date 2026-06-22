import { UserResponse } from "../users/users.types";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: UserResponse;
}
