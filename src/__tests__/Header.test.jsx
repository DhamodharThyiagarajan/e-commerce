vi.mock('../assets/1.png', () => ({ default: 'mock-logo.png' }));

import { render, screen, act, waitFor } from '@testing-library/react';
import Header from '../Components/layout/Header';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

// create a simple reducer for initial state
function reducer(state = { cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer, { cart: [], favorites: [] });

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: async () => []
    })
  );
});

afterEach(() => {
  global.fetch = undefined;
});

describe('Header component', () => {
  it('renders logo and buttons', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      );
    });
    await waitFor(() => {
      expect(screen.getByText(/ShopEase/i)).toBeInTheDocument();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/wishlist/i)).toBeInTheDocument();
    });
  });
});
