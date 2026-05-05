import { Route, Routes } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { SignInPage } from './auth/SignInPage';
import { SignUpPage } from './auth/SignUpPage';
import { ForgotPasswordPage } from './auth/ForgotPasswordPage';
import { CartPage } from './cart/CartPage';
import { FavoritesPage } from './favorites/FavoritesPage';
import { ShopPage } from './shop/ShopPage';
import { ProductCardPage } from './productCardPage/ProductCardPage';
import { ToastBar } from './toast/ToastBar';
import { ROUTES } from './routes';

export function App() {
  return (
    <>
      <ToastBar />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.PRODUCT_CARD} element={<ProductCardPage />} />
      </Routes>
    </>
  );
}

export default App;
