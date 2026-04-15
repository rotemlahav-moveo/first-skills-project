import { Link, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div>
      <h1>Welcome front</h1>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the root route. <Link to="/page-2">Go to page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Go back home.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
