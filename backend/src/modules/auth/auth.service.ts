import bcrypt from "bcryptjs";
import User from "../users/users.model";
import { generateToken } from "../../utils/jwt";
import { UserRole } from "../../constants/roles";
import { UserResponse } from "../users/users.types";
import { LoginResponse, RegisterInput } from "./auth.types";
import { serializeUser } from "../../utils/serializers";

export const registerUser = async (
  data: RegisterInput,
): Promise<UserResponse> => {
  const email = data.email.trim().toLowerCase();

  const isExisting = await User.findOne({ email });

  if (isExisting) {
    throw new Error("User already exists");
  }

  const isFirstUser = await User.countDocuments();

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await User.create({
    username: data.username,

    password: hashedPassword,

    email,

    role: isFirstUser === 0 ? UserRole.SUPER_ADMIN : UserRole.USER,
  });

  return serializeUser(newUser);
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const email = data.email?.trim().toLowerCase();
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  //generate JWT
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: serializeUser(user),
    token,
  };
};
