import { render, screen } from '@testing-library/react';
import Navbar from '../Components/layout/Navbar';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ city: 'Loc' }) });
});

afterEach(() => {
  global.fetch.mockRestore();
});

describe('Navbar component', () => {
  it('renders browse categories', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/browse categories/i)).toBeInTheDocument();
  });
});
