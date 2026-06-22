import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  createAdminUserController,
} from "./users.controller";
import authMiddleware from "../../middleware/auth.middleware";
import authorizeRoles from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createUserSchema } from "./users.validation";
import { UserRole } from "../../constants/roles";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles(UserRole.SUPER_ADMIN),
  getAllUsersController,
);
router.get("/:id", getUserByIdController);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.SUPER_ADMIN),
  updateUserController,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(UserRole.SUPER_ADMIN),
  deleteUserController,
);

router.post(
  "/users",
  authMiddleware,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validate(createUserSchema),
  createAdminUserController,
);

router.get("/me", authMiddleware, getUserByIdController);

export default router;
