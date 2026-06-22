import { Request } from "express";
import { UserRole } from "../../constants/roles";

export interface AuthInterface extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}
