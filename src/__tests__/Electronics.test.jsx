jest.mock('../../action/action', () => ({
  fetchElectronics: () => ({ type: 'MOCK' }),
  addToCart: jest.fn(),
  addToFavorite: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import Electronics from '../Components/categories/Electronics';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

const products = [{ id: 3, title: 'Laptop', price: 999, image: 'laptop.jpg', rating: { rate: 3, count: 5 } }];

function reducer(state = { Electronics: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer);

describe('Electronics category page', () => {
  it('renders heading and products', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Electronics />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
  });
});
