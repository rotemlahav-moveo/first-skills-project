import { render } from '@testing-library/react';
import { type ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './cart/CartContext';
import { FavoritesProvider } from './favorites/FavoritesContext';
import { store } from '../redux/store';
import App from './app';

function renderWithProviders(ui: ReactElement) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
        <FavoritesProvider>
          <CartProvider>{ui}</CartProvider>
        </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>,
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
