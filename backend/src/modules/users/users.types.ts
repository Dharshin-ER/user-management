import { HydratedDocument } from "mongoose";
import { UserRole } from "../../constants/roles";

// Database shape

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

// Mongoose document

export type UserDocument = HydratedDocument<IUser>;

// API response shape

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

// Create user payload

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Update user payload

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
