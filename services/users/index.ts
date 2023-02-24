import { baseApi } from "../baseApi";

export type UserPagination = {
  page: number;
  pageSize: number;
};
export type UserRequest = {
  name: string;
  password: string;
  phone: string;
  email: string;
};
export type UserResponse = {
  success: boolean;
};
export type FetchUserResponse = {
  data: Array<UserRequest>;
  limit: number;
  offset: number;
  total: number;
};
export const fetchUsersFn = async ({ page, pageSize }: UserPagination) => {
  const offset = page * pageSize;
  const { data } = await baseApi.get<FetchUserResponse>(
    `/api/view?offset=${offset}&limit=${pageSize}`
  );
  return data;
};

export const createUserFn = async (user: UserRequest) => {
  const response = await baseApi.post<UserResponse>("api/create", user);
  return response.data;
};
