import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthInterface } from "../types/express";

const authMiddleware = (
  req: AuthInterface,
  res: Response,
  next: NextFunction,
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
