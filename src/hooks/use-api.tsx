import { useState, useCallback } from "react";
import api from "@/lib/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseApiResult<T> {
  data: T | null;
  error: any;
  loading: boolean;
  execute: (config?: AxiosRequestConfig) => Promise<T>;
}

export function useApi<T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  initialData: T | null = null
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (config?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<T> = await api.request({
          url,
          method,
          ...config,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  return { data, error, loading, execute };
}
