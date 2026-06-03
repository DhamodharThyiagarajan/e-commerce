vi.mock('../action/action', () => ({
  fetchWomens: () => ({ type: 'MOCK' }),
  addToCart: vi.fn(),
  addToFavorite: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import Womens from '../Components/categories/Womens';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

const products = [{ id: 1, title: 'Dress', price: 10, image: 'img.jpg', rating: { rate: 4, count: 3 } }];

function reducer(state = { Womens: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer);

describe('Womens category page', () => {
  it('renders heading and products', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Womens />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/women's clothing/i)).toBeInTheDocument();
    expect(screen.getByText('Dress')).toBeInTheDocument();
  });
});
