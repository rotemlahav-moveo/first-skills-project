import { describe, expect, it, vi } from 'vitest';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  it('signup returns success envelope', async () => {
    const authService = {
      signup: vi.fn().mockResolvedValue({
        userId: 'user-1',
        name: 'Alex Morgan',
        email: 'demo@example.com',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      }),
      login: vi.fn(),
      refreshTokens: vi.fn(),
    } as unknown as AuthService;

    const controller = new AuthController(authService);
    const response = await controller.signup({
      name: 'Alex Morgan',
      email: 'demo@example.com',
      password: 'password123',
    });

    expect(response).toEqual({
      message: 'Signup successful',
      user: {
        userId: 'user-1',
        name: 'Alex Morgan',
        email: 'demo@example.com',
      },
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    });
  });

  it('login returns success envelope', async () => {
    const authService = {
      signup: vi.fn(),
      login: vi.fn().mockResolvedValue({
        userId: 'user-2',
        name: 'Sam Taylor',
        email: 'user2@example.com',
        accessToken: 'access-token-2',
        refreshToken: 'refresh-token-2',
      }),
      refreshTokens: vi.fn(),
    } as unknown as AuthService;

    const controller = new AuthController(authService);
    const response = await controller.login({
      email: 'user2@example.com',
      password: 'password123',
    });

    expect(response).toEqual({
      message: 'Login successful',
      user: {
        userId: 'user-2',
        name: 'Sam Taylor',
        email: 'user2@example.com',
      },
      tokens: {
        accessToken: 'access-token-2',
        refreshToken: 'refresh-token-2',
      },
    });
  });

  it('refresh returns rotated token envelope', async () => {
    const authService = {
      signup: vi.fn(),
      login: vi.fn(),
      refreshTokens: vi.fn().mockResolvedValue({
        userId: 'user-1',
        name: 'Alex Morgan',
        email: 'demo@example.com',
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      }),
    } as unknown as AuthService;

    const controller = new AuthController(authService);
    const response = await controller.refresh({
      userId: 'user-1',
      refreshToken: 'refresh-token',
    });

    expect(response).toEqual({
      message: 'Token refresh successful',
      user: {
        userId: 'user-1',
        name: 'Alex Morgan',
        email: 'demo@example.com',
      },
      tokens: {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      },
    });
  });
});
