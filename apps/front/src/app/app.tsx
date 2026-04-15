import { Route, Routes } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { AuthPlaceholder } from './auth/AuthPlaceholder';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<AuthPlaceholder title="Sign in" />} />
      <Route path="/sign-up" element={<AuthPlaceholder title="Sign up" />} />
    </Routes>
  );
}

export default App;
