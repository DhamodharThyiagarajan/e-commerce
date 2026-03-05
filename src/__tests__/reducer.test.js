import reducer from '../reducer/reducer';
import { ADD_TO_CART } from '../action/actionType';

describe('root reducer', () => {
  it('returns correct initial state', () => {
    const expected = {
      Electronics: [],
      Womens: [],
      Mens: [],
      Jewellerys: [],
      cart: [],
      favorites: []
    };
    expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(expected);
  });

  it('adds item to cart when ADD_TO_CART dispatched', () => {
    const item = { id: 1, name: 'test' };
    const newState = reducer(undefined, { type: ADD_TO_CART, payload: item });
    expect(newState.cart).toContainEqual({ ...item, quantity: 1 });
  });
});
