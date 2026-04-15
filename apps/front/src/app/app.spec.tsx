import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render homepage marketing sections', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(
      getByRole('heading', { level: 1, name: /shop smarter, dress better/i }),
    ).toBeTruthy();
    expect(
      getByRole('heading', { level: 2, name: /features built for fast discovery/i }),
    ).toBeTruthy();
    expect(getByRole('link', { name: /sign up/i })).toBeTruthy();
  });
});
