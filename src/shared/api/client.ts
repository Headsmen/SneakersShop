import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://c926bd874405098b.mokky.dev';

export const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const apiClient = createApiClient();
