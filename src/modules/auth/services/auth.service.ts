// src/features/auth/services/AuthRepository.ts
import { httpService } from "../../../core/services/http.service";

export interface LoginResponse {
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  const res: any = await httpService.post("/auth/login", {
    email,
    password,
  });

  const token = res?.headers?.authorization?.replace("Bearer ", "");
  if (!token) {
    throw new Error("Token not found in response headers");
  }

  return { token };
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await httpService.post("/auth/register", data);
  return res;
};

export const getCurrentUser = async () => {
  return httpService.get("/auth/me");
};
