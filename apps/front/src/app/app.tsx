import { Route, Routes } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { SignInPage } from './auth/SignInPage';
import { SignUpPage } from './auth/SignUpPage';
import { ForgotPasswordPage } from './auth/ForgotPasswordPage';
import { CartPage } from './cart/CartPage';
import { ShopPage } from './shop/ShopPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  );
}

export default App;
