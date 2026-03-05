jest.mock('../action/action', () => ({
  fetchJewellerys: () => ({ type: 'MOCK' }),
  addToCart: jest.fn(),
  addToFavorite: jest.fn(),
}));

import { render, screen, act } from '@testing-library/react';
import Jewellery from '../Components/categories/Jewellery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

jest.useFakeTimers();

const products = [{ id: 4, title: 'Necklace', price: 50, image: 'neck.jpg', rating: { rate: 4, count: 1 } }];

function reducer(state = { Jewellerys: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer);

describe('Jewellery category page', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders heading and shows products after delay', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Jewellery />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/jewellery/i)).toBeInTheDocument();
    // advance timers and wrap in act to handle state updates
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Necklace')).toBeInTheDocument();
  });
});
