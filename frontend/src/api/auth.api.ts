import api from "./axios";

export const loginApi = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const getCurrentUserApi = () => {
  return api.get("/users/me");
};
