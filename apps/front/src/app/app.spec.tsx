import { render } from '@testing-library/react';
import { type ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './cart/CartContext';
import App from './app';

function renderWithProviders(ui: ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render homepage marketing sections', () => {
    const { getByRole, getAllByRole } = renderWithProviders(<App />);
    expect(
      getByRole('heading', { level: 1, name: /discover your style/i }),
    ).toBeTruthy();
    expect(
      getByRole('heading', { level: 2, name: /shop by category/i }),
    ).toBeTruthy();
    expect(getAllByRole('link', { name: /create account/i }).length).toBeGreaterThan(0);
  });
});
