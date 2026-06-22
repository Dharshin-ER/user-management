import { UserDocument } from "../modules/users/users.types";

export const serializeUser = (user: UserDocument) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
