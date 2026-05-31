import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * Expected API error shape from backend (NestJS friendly)
 */
export interface ApiError {
  message: string;
  statusCode?: number;
}

/**
 * Create Axios instance
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR (attach token)
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  },
);

/**
 * RESPONSE INTERCEPTOR (handle errors globally)
 */
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
  },
  (error: AxiosError<ApiError>): Promise<never> => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirecting...");
      // window.location.href = "/login";
    }

    return Promise.reject(error.response?.data ?? { message: "Unknown error" });
  },
);

export default axiosInstance;
