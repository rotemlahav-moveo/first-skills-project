import { Route, Routes } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { SignInPage } from './auth/SignInPage';
import { SignUpPage } from './auth/SignUpPage';
import { ForgotPasswordPage } from './auth/ForgotPasswordPage';
import { CartPage } from './cart/CartPage';
import { ShopPage } from './shop/ShopPage';
import { ProductCardPage } from './productCardPage/ProductCardPage';
import { ToastBar } from './toast/ToastBar';

export function App() {
  return (
    <>
      <ToastBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductCardPage />} />
      </Routes>
    </>
  );
}

export default App;
