// src/core/axios/BaseRepository.ts
import { AxiosInstance } from "axios";
import apiClient from "../axios/apiClient";

class HttpService {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get<T>(url: string, params?: object): Promise<T> {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  }

  async post<T>(
    url: string,
    data?: object
  ): Promise<{ data: T; headers: any }> {
    const response = await apiClient.post<T>(url, data);
    return { data: response.data, headers: response.headers };
  }

  async put<T>(url: string, data?: object): Promise<T> {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string, params?: object): Promise<T> {
    const response = await apiClient.delete<T>(url, { params });
    return response.data;
  }
}

export const httpService = new HttpService(apiClient);
