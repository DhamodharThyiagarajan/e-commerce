vi.mock('../action/action', () => ({
  fetchMens: () => ({ type: 'MOCK' }),
  addToCart: vi.fn(),
  addToFavorite: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import Mens from '../Components/categories/Mens';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

const products = [{ id: 2, title: 'Shirt', price: 20, image: 'img2.jpg', rating: { rate: 5, count: 2 } }];

function reducer(state = { Mens: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer);

describe('Mens category page', () => {
  it('renders heading and products', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Mens />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/men's clothing/i)).toBeInTheDocument();
    expect(screen.getByText('Shirt')).toBeInTheDocument();
  });
});
