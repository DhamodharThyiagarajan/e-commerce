vi.mock('../action/action', () => ({
  fetchJewellerys: () => ({ type: 'MOCK' }),
  addToCart: vi.fn(),
  addToFavorite: vi.fn(),
}));

import { render, screen, act } from '@testing-library/react';
import Jewellery from '../Components/categories/Jewellery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

vi.useFakeTimers();

const products = [{ id: 4, title: 'Necklace', price: 50, image: 'neck.jpg', rating: { rate: 4, count: 1 } }];

function reducer(state = { Jewellerys: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer);

describe('Jewellery category page', () => {
  afterEach(() => {
    vi.clearAllTimers();
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
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Necklace')).toBeInTheDocument();
  });
});
