import type { LoginData, LoginResponse } from "@/types/authTypes";
import apiClient from "./apiClient";

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/authenticate",
    data
  );

  return response.data;
};
