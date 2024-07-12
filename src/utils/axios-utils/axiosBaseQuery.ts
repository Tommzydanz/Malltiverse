// utils/axiosQuery.ts

import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { apiKey, appId, organizationId } from "../constants";

interface AxiosQueryConfig {
  baseUrl: string;
  baseHeaders?: AxiosRequestConfig["headers"];
}

interface QueryParams {
  url: string;
  method?: AxiosRequestConfig["method"];
  body?: AxiosRequestConfig["data"];
  headers?: AxiosRequestConfig["headers"];
}

interface QueryResult<T = unknown> {
  data?: T;
  error?: {
    data: unknown;
    status?: number;
  };
}

/**
 * Creates an axios query function with the provided configuration.
 *
 * @param {AxiosQueryConfig} config - The configuration options for the axios query.
 * @returns {<T = unknown>(params: QueryParams) => Promise<QueryResult<T>>} - The axios query function.
 */
export const createAxiosQuery = ({
  baseUrl = "",
  baseHeaders = {},
}: AxiosQueryConfig) => {
  return async <T = unknown>({
    url,
    method = "GET",
    body,
    headers = {},
  }: QueryParams): Promise<QueryResult<T>> => {
    try {
      const fullUrl = new URL(baseUrl + url);
      fullUrl.searchParams.append('organization_id', organizationId);
      fullUrl.searchParams.append('Appid', appId);
      fullUrl.searchParams.append('Apikey', apiKey);
    
      console.log('Constructed URL:', fullUrl.toString());

      const result: AxiosResponse<T> = await axios({
        url: fullUrl.toString(),
        method,
        data: body,
        headers: { ...baseHeaders, ...headers },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { 
          data: err.response?.data,
          status: err.response?.status
        },
      };
    }
  };
};