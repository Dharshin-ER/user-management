import express from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
const authRouter = express.Router();

console.log("Dharshin-route-hit");
authRouter.post(
  "/login",
  validate(loginSchema),
  authController.loginController,
);
authRouter.post(
  "/register",
  validate(registerSchema),
  authController.registerController,
);

export default authRouter;
