import mongoose from "mongoose";
import { UserRole } from "../../constants/roles";
import { UserDocument } from "./users.types";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
