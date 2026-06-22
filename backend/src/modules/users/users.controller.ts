import { Request, Response } from "express";
import * as userService from "./users.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthInterface } from "../../types/express";

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updatedUser = await userService.updateUser(id, req.body);

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { ...safeUser } = updatedUser;
  res.json(safeUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const deleted = await userService.deleteUser(id);
  if (!deleted) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(204).send();
};

export const createAdminUserController = asyncHandler(
  async (req: AuthInterface, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const createdAdmin = await userService.createAdminUser(req.body, req.user);
    res.status(201).json(createdAdmin);
  },
);
