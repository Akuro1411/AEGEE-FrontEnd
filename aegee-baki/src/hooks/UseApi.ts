import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  baseURL?: string;
}

function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const axiosInstance = axios.create({
    baseURL: options.baseURL,
  });

  const request = useCallback(
    async (
      method: AxiosRequestConfig['method'],
      endpoint: string,
      data?: any,
      config: AxiosRequestConfig = {}
    ) => {
      setState({ data: null, loading: true, error: null });
      const lang = localStorage.getItem('language') || 'en';
      const token = sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)?.replace(/"/g, '');

      try {
        const headers: any = {
          'Accept-Language': lang,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...config.headers,
        };

        if (!(data instanceof FormData)) {
          headers['Content-Type'] = 'application/json';
        }

        const response = await axiosInstance(endpoint, {
          method,
          data,
          headers,
          ...config,
          withCredentials: true, // lazım gələrsə
        });

        setState({ data: response.data, loading: false, error: null });
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        throw {
          message: errorMessage,
          status: error.response?.status || null,
          raw: error
        };
      }
    },
    [axiosInstance]
  );

  const get = useCallback((endpoint: string, config: AxiosRequestConfig = {}) => request('GET', endpoint, undefined, config), [request]);
  const post = useCallback((endpoint: string, data?: any, config: AxiosRequestConfig = {}) => request('POST', endpoint, data, config), [request]);

  return { ...state, get, post };
}

export default useApi;