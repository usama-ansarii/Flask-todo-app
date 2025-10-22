import axios from "axios";
import { basePath } from "../contants";
export const apiServices = axios.create({
  baseURL: basePath,
  timeout: 35000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiServices.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
