import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { AuthResponse, RefreshTokenRequest } from '@shared/auth-contracts';

import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  persistAuthSession,
} from '../app/auth/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
const SESSION_EXPIRED_ERROR = 'Session expired. Please sign in again.';
const AUTH_EXCLUDED_PATHS = new Set(['/auth/login', '/auth/signup', '/auth/refresh']);

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const requestUrl = typeof args === 'string' ? args : args.url;

  if (result.error?.status !== 401 || AUTH_EXCLUDED_PATHS.has(requestUrl)) {
    return result;
  }

  const refreshToken = getRefreshToken();
  const user = getStoredUser();

  if (!refreshToken || !user?.userId) {
    clearAuthSession();
    return {
      error: {
        status: 401,
        data: { message: SESSION_EXPIRED_ERROR },
      },
    };
  }

  const refreshResult = await rawBaseQuery(
    {
      url: '/auth/refresh',
      method: 'POST',
      body: { userId: user.userId, refreshToken } satisfies RefreshTokenRequest,
    },
    api,
    extraOptions,
  );

  if (refreshResult.data) {
    persistAuthSession(refreshResult.data as AuthResponse);
    result = await rawBaseQuery(args, api, extraOptions);
    return result;
  }

  clearAuthSession();
  return {
    error: {
      status: 401,
      data: { message: SESSION_EXPIRED_ERROR },
    },
  };
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
