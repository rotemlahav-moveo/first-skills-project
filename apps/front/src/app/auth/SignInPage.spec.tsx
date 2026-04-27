import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AuthProvider } from './AuthContext';
import { SignInPage } from './SignInPage';
import { login } from './api';

vi.mock('./api', () => ({
  login: vi.fn(),
  getErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Something went wrong. Please try again.',
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

function renderPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('SignInPage', () => {
  it('shows validation errors before submit', async () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Enter a valid email address.')).toBeTruthy();
    expect(await screen.findByText('Password is required.')).toBeTruthy();
    expect(login).not.toHaveBeenCalled();
  });

  it('submits valid values through auth api', async () => {
    vi.mocked(login).mockResolvedValue({
      message: 'Login successful',
      user: {
        userId: 'user-1',
        email: 'user@example.com',
        name: 'User Example',
      },
      tokens: {
        accessToken: 'token',
        refreshToken: 'refresh',
      },
    });

    renderPage();

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'secure-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secure-password',
      });
    });
  });
});
