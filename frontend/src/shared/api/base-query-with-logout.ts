type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

import {
  FetchBaseQueryMeta,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { baseQuery } from "./base-query";
import { clearSessionData } from "./clear-session-data";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

const AUTH_ERROR_CODES = new Set([403, 401]);

export async function baseQueryWithLogout(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  const result = await baseQuery(args, api, extraOptions);

  if (
    typeof result.error?.status === "number" &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    api.dispatch(clearSessionData());
  }

  return result;
}
