/**
 * reducer.js - Redux root reducer
 * Single reducer that handles: category product lists (Electronics, Womens, Mens, Jewellerys),
 * cart (add, remove, increase/decrease quantity), and favorites (add, remove).
 * State is immutable; each case returns a new state object.
 */

import {
  ELECTRONICS,
  WOMENS,
  MENS,
  JEWELLERYS,
  ADD_TO_CART,
  ADD_TO_FAVORITE,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVORITE,
} from "../action/actionType";

// Initial state: empty arrays for categories and cart/favorites
const initstate = {
  Electronics: [],
  Womens: [],
  Mens: [],
  Jewellerys: [],
  cart: [],
  favorites: [],
};

const reducer = (state = initstate, action) => {
  switch (action.type) {
    // ---------- Category data from API ----------
    case ELECTRONICS:
      return { ...state, Electronics: action.payload };
    case WOMENS:
      return { ...state, Womens: action.payload };
    case MENS:
      return { ...state, Mens: action.payload };
    case JEWELLERYS:
      return { ...state, Jewellerys: action.payload };

    // ---------- Cart: add product (avoid duplicate entries; existing item keeps same quantity) ----------
    case ADD_TO_CART: {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return { ...state, cart: state.cart.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity } : item)) };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }

    // ---------- Favorites: add only if not already in list ----------
    case ADD_TO_FAVORITE: {
      const favExisting = state.favorites.find((item) => item.id === action.payload.id);
      if (favExisting) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    }

    // ---------- Cart: increase quantity for item by id ----------
    case INCREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    // ---------- Cart: decrease quantity (minimum 1) ----------
    case DECREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
    }

    // ---------- Cart: remove item by id ----------
    case REMOVE_FROM_CART: {
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    }

    // ---------- Favorites: remove item by id ----------
    case REMOVE_FROM_FAVORITE: {
      return { ...state, favorites: state.favorites.filter((item) => item.id !== action.payload) };
    }

    default:
      return state;
  }
};

export default reducer;
