import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { scryptSync } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from './auth.service';

function createRepositoryMock() {
  return {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
  };
}

function hashValue(secret: string): string {
  const salt = 'fixed-test-salt';
  const hash = scryptSync(secret, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

describe('AuthService', () => {
  it('signup creates a user and returns user with token pair', async () => {
    const repo = createRepositoryMock();
    repo.findOne.mockResolvedValue(null);
    repo.create.mockImplementation((value) => value);
    repo.save.mockResolvedValue({
      id: 'user-1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      passwordHash: 'hashed',
      refreshTokenHash: null,
    } as UserEntity);
    repo.update.mockResolvedValue({ affected: 1 });

    const jwtService = {
      signAsync: vi
        .fn()
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token'),
    };

    const service = new AuthService(repo as never, jwtService as never);

    const result = await service.signup({
      name: ' Alex Morgan ',
      email: ' Demo@Example.com ',
      password: 'password123',
    });

    expect(result).toEqual({
      userId: 'user-1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
    expect(repo.findOne).toHaveBeenCalledWith({
      where: { email: 'demo@example.com' },
    });
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('signup throws when email already exists', async () => {
    const repo = createRepositoryMock();
    repo.findOne.mockResolvedValue({
      id: 'existing-user',
      email: 'demo@example.com',
    } as UserEntity);

    const service = new AuthService(repo as never, {} as never);

    await expect(
      service.signup({
        name: 'Alex Morgan',
        email: 'demo@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('login throws unauthorized for unknown user', async () => {
    const repo = createRepositoryMock();
    repo.findOne.mockResolvedValue(null);

    const service = new AuthService(repo as never, {} as never);

    await expect(
      service.login({
        email: 'demo@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('refreshTokens rotates tokens when refresh token is valid', async () => {
    const refreshToken = 'refresh-token-value';
    const repo = createRepositoryMock();
    repo.findOne.mockResolvedValue({
      id: 'user-1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      passwordHash: 'unused',
      refreshTokenHash: hashValue(refreshToken),
    } as UserEntity);
    repo.update.mockResolvedValue({ affected: 1 });

    const jwtService = {
      signAsync: vi
        .fn()
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token'),
    };

    const service = new AuthService(repo as never, jwtService as never);

    const result = await service.refreshTokens({
      userId: 'user-1',
      refreshToken,
    });

    expect(result).toEqual({
      userId: 'user-1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });
    expect(repo.update).toHaveBeenCalledTimes(1);
  });

  it('refreshTokens throws unauthorized when refresh token is invalid', async () => {
    const repo = createRepositoryMock();
    repo.findOne.mockResolvedValue({
      id: 'user-1',
      name: 'Alex Morgan',
      email: 'demo@example.com',
      passwordHash: 'unused',
      refreshTokenHash: hashValue('some-other-token'),
    } as UserEntity);

    const service = new AuthService(repo as never, {} as never);

    await expect(
      service.refreshTokens({
        userId: 'user-1',
        refreshToken: 'bad-refresh-token',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
