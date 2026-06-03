import { render, screen } from '@testing-library/react';
import Electronics from '../Components/categories/Electronics';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';

const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);

const products = [{ id: 3, title: 'Laptop', price: 999, image: 'laptop.jpg', rating: { rate: 3, count: 5 } }];

function reducer(state = { Electronics: products, cart: [], favorites: [] }) {
  return state;
}

const store = createStore(reducer, undefined, applyMiddleware(thunkMiddleware));

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: async () => products,
    })
  );
});

afterEach(() => {
  global.fetch = undefined;
});

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
