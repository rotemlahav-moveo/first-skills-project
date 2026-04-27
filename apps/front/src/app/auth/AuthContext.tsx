import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { AuthResponse, AuthUser } from '../../../../../libs/shared/auth-contracts/src';
import { clearAuthSession, getAccessToken, getStoredUser, persistAuthSession } from './storage';

type AuthContextValue = {
  user: AuthUser | null;
  setSession: (auth: AuthResponse) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function readSessionUser(): AuthUser | null {
  if (!getAccessToken()) {
    return null;
  }
  return getStoredUser();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(readSessionUser);

  const setSession = useCallback((auth: AuthResponse) => {
    persistAuthSession(auth);
    setUser(auth.user);
  }, []);

  const signOut = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.storageArea !== localStorage) {
        return;
      }
      if (event.key !== null && !String(event.key).startsWith('auth_')) {
        return;
      }
      setUser(readSessionUser());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(
    () => ({ user, setSession, signOut }),
    [user, setSession, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
