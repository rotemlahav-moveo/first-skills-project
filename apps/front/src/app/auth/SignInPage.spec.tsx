import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AuthProvider } from './AuthContext';
import { SignInPage } from './SignInPage';
import { store } from '../../redux/store';
import { useLoginMutation } from '../../redux/authApi/authApi';

vi.mock('../../redux/authApi/authApi', async () => {
  const actual = await vi.importActual<typeof import('../../redux/authApi/authApi')>(
    '../../redux/authApi/authApi',
  );
  return {
    ...actual,
    useLoginMutation: vi.fn(),
    getErrorMessage: (error: unknown) =>
      error instanceof Error ? error.message : 'Something went wrong. Please try again.',
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

function renderPage() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <AuthProvider>
          <SignInPage />
        </AuthProvider>
      </MemoryRouter>
    </Provider>,
  );
}

describe('SignInPage', () => {
  const loginMock = vi.fn();

  beforeEach(() => {
    loginMock.mockReset();
    vi.mocked(useLoginMutation).mockReturnValue([loginMock, { isLoading: false }] as never);
  });

  it('shows validation errors before submit', async () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Enter a valid email address.')).toBeTruthy();
    expect(await screen.findByText('Password is required.')).toBeTruthy();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('submits valid values through auth api', async () => {
    loginMock.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({
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
      }),
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
      expect(loginMock).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secure-password',
      });
    });
  });

  it('shows API error returned by mutation unwrap', async () => {
    loginMock.mockReturnValue({
      unwrap: vi.fn().mockRejectedValue(new Error('Invalid credentials')),
    });

    renderPage();

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrong-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeTruthy();
  });
});
