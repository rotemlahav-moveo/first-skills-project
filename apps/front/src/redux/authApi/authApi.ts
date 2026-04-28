import type {
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  SignupRequest,
} from '@shared/auth-contracts';

import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (payload) => ({
        url: '/auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    refresh: builder.mutation<AuthResponse, RefreshTokenRequest>({
      query: (payload) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useRefreshMutation } = authApi;

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const maybeError = error as { data?: { message?: string } };
    if (maybeError.data?.message) {
      return maybeError.data.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
