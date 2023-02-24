import axios from "axios";

export const baseApi = axios.create({
  baseURL: "",
  withCredentials: true,
});

