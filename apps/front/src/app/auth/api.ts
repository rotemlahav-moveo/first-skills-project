import type {
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  SignupRequest,
} from '../../../../../libs/shared/auth-contracts/src';
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  persistAuthSession,
} from './storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
// called to make a request without the access token
async function postJson<TResponse, TPayload>(
  path: string,
  payload: TPayload,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    const message = data?.message ?? 'Request failed';
    throw new ApiError(message, response.status);
  }

  return data as TResponse;
}
// called to refresh the access token and persist the session
async function refreshAndPersistSession(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  const user = getStoredUser();
  if (!refreshToken || !user?.userId) {
    clearAuthSession();
    return null;
  }

  try {
    const refreshed = await refresh({
      userId: user.userId,
      refreshToken,
    });
    persistAuthSession(refreshed);
    return refreshed.tokens.accessToken;
  } catch {
    clearAuthSession();
    return null;
  }
}

// called to make a request with the access token
export async function postJsonWithAuth<TResponse, TPayload>(
  path: string,
  payload: TPayload,
): Promise<TResponse> {
  const requestWithToken = async (token: string | null): Promise<Response> =>
    fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

  let accessToken = getAccessToken();
  let response = await requestWithToken(accessToken);

  if (response.status === 401) {
    accessToken = await refreshAndPersistSession();
    if (!accessToken) {
      throw new ApiError('Session expired. Please sign in again.', 401);
    }
    response = await requestWithToken(accessToken);
  }

  const data = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    const message = data?.message ?? 'Request failed';
    throw new ApiError(message, response.status);
  }

  return data as TResponse;
}

export function signup(payload: SignupRequest): Promise<AuthResponse> {
  return postJson<AuthResponse, SignupRequest>('/auth/signup', payload);
}

export function login(payload: LoginRequest): Promise<AuthResponse> {
  return postJson<AuthResponse, LoginRequest>('/auth/login', payload);
}

export function refresh(payload: RefreshTokenRequest): Promise<AuthResponse> {
  return postJson<AuthResponse, RefreshTokenRequest>('/auth/refresh', payload);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
