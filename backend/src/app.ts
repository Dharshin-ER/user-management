import express from "express";
import userRoutes from "./modules/users/users.routes";
import authRouter from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json()); // Middleware to parse JSON bodies

// use user-routes
app.use("/api/users", userRoutes);
// use auth-routes
app.use("/api/auth", authRouter);

// error middleware
app.use(globalErrorHandler);

export default app;
