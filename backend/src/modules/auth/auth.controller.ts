import { Request, Response } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/apiResponse";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Dharshin-controller-hit");
    console.log("register request body:", req.body);

    const registerUser = await authService.registerUser(req.body);

    // const { user, token } = await authService.loginUser(registerUser.toJSON());

    res.status(201).json({
      message: "User Registered",
      user: registerUser,
      // token,
    });
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token } = await authService.loginUser(req.body);

    res.status(200).json(successResponse({ token, user }, "Login successful"));
  },
);
