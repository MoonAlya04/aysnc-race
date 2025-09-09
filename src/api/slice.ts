import axios, { AxiosError, Method } from "axios";
import type { FailedResponse, RequestOptions, ResponseModel } from "../api/types";
import { useCallback, useEffect, useState } from "react";

type UseApiError = { code: number; message: string };
type UseApi<T> = {
  reload: () => void;
  data: T | null;
  loading: boolean;
  error: UseApiError | null;
  success: boolean;
};

const API_URL = process.env.REACT_APP_API_URL ?? "";

export default class ApiSlice {
  static baseURL: string = API_URL;

  static async request<T = unknown>(
    url = "",
    method: Method = "GET",
    payload: object | FormData | null = null,
    options?: RequestOptions
  ): Promise<ResponseModel<T>> {
    let headers: {
      Authorization?: string;
      Timezone: string;
      "Content-Type"?: string;
    } = {
      Timezone: String(-new Date().getTimezoneOffset() / 60)
    };

    // Add Content-Type only if not FormData
    if (!(payload instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (options?.headers) headers = { ...headers, ...options.headers };

    try {
      const rsp = await axios({
        method,
        url: this.baseURL + url,
        headers,
        data: payload || undefined,
        responseType: "json"
      });

      const totalCount: number | undefined = rsp.headers["x-total-count"] ? Number(rsp.headers["x-total-count"]) : undefined;

      return {
        data: rsp.data,
        meta: {
          totalCount,
          error: null,
          status: rsp.status
        }
      };
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      if (axiosErr.response) {
        return {
          data: null as unknown as T,
          meta: {
            error: {
              code: axiosErr.response.status,
              message: axiosErr.response.data?.message || axiosErr.response.statusText || "Unknown error"
            },
            status: axiosErr.response.status
          }
        };
      }

      return {
        data: null as unknown as T,
        meta: {
          status: 400,
          error: { code: 4000, message: "Unknown Error" }
        }
      };
    }
  }

  static error(): Promise<ResponseModel<null>> {
    return Promise.resolve({
      data: null,
      meta: {
        error: {
          code: 4000,
          message: "Unknown error"
        },
        status: 400
      }
    });
  }
}

export function useApi<T>(fetcher: () => Promise<ResponseModel<T>>, dependencies: unknown[] = []): UseApi<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setUseApiError] = useState<UseApiError | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const rsp = await fetcher();
      if (!rsp.meta.error) {
        setData(rsp.data);
        setUseApiError(null);
      } else {
        setData(null);
        setUseApiError({
          code: rsp.meta.error.code,
          message: rsp.meta.error.message
        });
      }
    } catch (err) {
      setData(null);
      setUseApiError({
        code: 500,
        message: "Network error occurred"
      });
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  const reload = useCallback(() => {
    void getData();
  }, [getData]);

  useEffect(() => {
    void getData();
  }, [getData, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    success: Boolean(!loading && !error && data),
    error,
    reload
  };
}

export function isFailedResponse<T>(response: ResponseModel<T>): response is FailedResponse {
  return response.meta.error !== null;
}
