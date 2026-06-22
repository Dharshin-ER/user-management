import { UserRole } from "../../constants/roles";
import User from "./users.model";
import bcrypt from "bcryptjs";
import { UpdateUserInput, UserResponse } from "./users.types";
import { serializeUser } from "../../utils/serializers";

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await User.find();

  return users.map(serializeUser);
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return serializeUser(user);
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput,
): Promise<UserResponse | null> => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return serializeUser(updatedUser);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser !== null;
};

export const createAdminUser = async (
  data: {
    username: string;
    password: string;
    email: string;
    role: UserRole;
  },
  currentUser: any,
): Promise<UserResponse> => {
  if (!currentUser || !currentUser.role) {
    throw new Error("Unauthorized");
  }

  if (currentUser.role === UserRole.ADMIN && data.role === UserRole.ADMIN) {
    throw new Error("Admin cannot create admin users");
  }
  if (
    currentUser.role === UserRole.ADMIN &&
    data.role === UserRole.SUPER_ADMIN
  ) {
    throw new Error("Admin cannot create super admin users");
  }
  const email = data.email?.trim().toLowerCase();

  if (!email) {
    throw new Error("Email is required");
  }

  const isExisting = await User.findOne({ email: email });

  if (isExisting) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await User.create({
    username: data.username,
    password: hashedPassword,
    email,
    role: data.role ?? UserRole.USER,
  });
  return serializeUser(newUser);
};
