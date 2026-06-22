import jwt from "jsonwebtoken";
import { UserRole } from "../constants/roles";

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
}

const getSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return secret;
};

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, getSecretKey(), {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, getSecretKey()) as JWTPayload;
};
