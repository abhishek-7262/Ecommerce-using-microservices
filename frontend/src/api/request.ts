import axiosInstance from "./axios";

/**
 * Generic GET request
 */
export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

/**
 * Generic POST request
 */
export const postRequest = async <TResponse, TBody>(
  url: string,
  body: TBody,
): Promise<TResponse> => {
  const response = await axiosInstance.post<TResponse>(url, body);
  return response.data;
};

/**
 * Generic PUT request
 */
export const putRequest = async <TResponse, TBody>(
  url: string,
  body: TBody,
): Promise<TResponse> => {
  const response = await axiosInstance.put<TResponse>(url, body);
  return response.data;
};

/**
 * Generic DELETE request
 */
export const deleteRequest = async <TResponse>(
  url: string,
): Promise<TResponse> => {
  const response = await axiosInstance.delete<TResponse>(url);
  return response.data;
};
