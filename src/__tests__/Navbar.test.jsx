import { render, screen, act, waitFor } from '@testing-library/react';
import Navbar from '../Components/layout/Navbar';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ city: 'Loc' }) });
});

afterEach(() => {
  global.fetch = undefined;
});

describe('Navbar component', () => {
  it('renders browse categories', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      expect(screen.getByText(/browse categories/i)).toBeInTheDocument();
    });
  });
});
