import { Response, Request, NextFunction } from "express";
import { AuthInterface } from "../types/express";

const authorizeRoles = (...roles: string[]) => {
  return (req: AuthInterface, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default authorizeRoles;
