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
    const { getByRole, getAllByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(
      getByRole('heading', { level: 1, name: /discover your style/i }),
    ).toBeTruthy();
    expect(
      getByRole('heading', { level: 2, name: /shop by category/i }),
    ).toBeTruthy();
    expect(getAllByRole('link', { name: /create account/i }).length).toBeGreaterThan(0);
  });
});
