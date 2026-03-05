jest.mock('../assets/1.png', () => 'mock-logo.png');

import { render, screen } from '@testing-library/react';
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
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: async () => []
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Header component', () => {
  it('renders logo and buttons', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/ShopEase/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cart/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/wishlist/i)).toBeInTheDocument();
  });
});
