import type { AuthResponse, AuthUser } from '@shared/auth-contracts';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

// called after successful login or signup to store the auth tokens and user in localStorage
export function persistAuthSession(auth: AuthResponse): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, auth.tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.tokens.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

// called when the user logs out to clear the auth tokens and user from localStorage
export function clearAuthSession(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// called to retrieve the access token from localStorage at every request
export function getAccessToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// called to retrieve the refresh token from localStorage when the access token is expired
export function getRefreshToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// called to retrieve the user from localStorage
export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) {
    return null;
  }

  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}
