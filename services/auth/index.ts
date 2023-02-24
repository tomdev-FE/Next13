import { baseApi } from "../baseApi";

export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
  auth: boolean;
  errorDetails?: string;
};

export const loginFn = async (user: LoginRequest) => {
  const response = await baseApi.post<LoginResponse>("api/auth", user);
  return response.data;
};
