import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ecommerce_dashboard from '../Pages/Home';

describe('Home page', () => {
  it('renders Banner component', () => {
    render(
      <MemoryRouter>
        <Ecommerce_dashboard />
      </MemoryRouter>
    );
    // banner contains at least one img for carousel
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });
});
