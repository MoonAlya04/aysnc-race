/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosError, Method } from "axios";
import { useCallback, useEffect, useState } from "react";
import type { FailedResponse, RequestOptions, ResponseModel } from "../api/types";

type UseApiError = { code: number; message: string };
type UseApi<T> = {
  reload: () => void;
  data: T | null;
  loading: boolean;
  error: UseApiError | null;
  success: boolean;
};

const API_URL = process.env.REACT_APP_API_URL || "";
export default class ApiSlice {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  static baseURL: string = API_URL;

  static async request<T = unknown>(
    url = "",
    method: Method = "GET",
    payload: object | FormData | null = null,
    options: RequestOptions = null
  ): Promise<ResponseModel<T>> {
    let headers: {
      Authorization?: string;
      Timezone: string;
      "Content-Type": string;
    } = {
      Timezone: -new Date().getTimezoneOffset() / 60 + "",
      "Content-Type": "application/json"
    };

    if (options?.headers) headers = { ...headers, ...options.headers };
    try {
      const rsp =
        (await axios({
          method,
          url: this.baseURL + url,
          headers,
          data: payload || undefined,
          responseType: "json"
        })) || ({} as ResponseModel<T>);

      const totalCount: number | undefined = rsp.headers["x-total-count"];
      return {
        data: totalCount ? { data: rsp.data, totalCount } : rsp.data,
        meta: {
          error: null,
          status: rsp.status
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(
        "Request Error",
        (err as AxiosError<ResponseModel<T>>).response ? JSON.stringify(err.response) : JSON.stringify(err)
      );
      const response =
        (err.response && {
          data: null,
          meta: {
            error: {
              code: err.response.status,
              message: err.response.statusText
            },
            status: err.response.status
          }
        }) ||
        ({
          meta: {
            status: 400,
            error: { code: 4000, message: "Unknown Error" }
          }
        } as ResponseModel<T>);

      return response;
    }
  }

  static useApi<T>(fetcher: () => Promise<ResponseModel<T>>, params?: unknown[]): UseApi<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setUseApiError] = useState<UseApiError | null>(null);
    const getData = useCallback(async () => {
      const rsp = await fetcher();
      if (!rsp.meta.error) {
        setData(rsp.data);
        setLoading(false);
        if (error) setUseApiError(null);
      } else {
        if (data) setData(null);
        setUseApiError({
          code: rsp.meta.error.code,
          message: rsp.meta.error.message
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(params || [])]);
    const reload = useCallback(() => getData(), [getData]);
    useEffect(() => {
      getData();
    }, [getData]);
    return {
      data,
      loading,
      success: Boolean(!loading && !error),
      error,
      reload
    };
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

export function isFailedResponse(response: ResponseModel): response is FailedResponse {
  return response.meta.error !== null;
}
