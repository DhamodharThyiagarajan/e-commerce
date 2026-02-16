/**
 * action.js - Redux action creators
 * Sync actions for cart/favorites; async thunk actions to fetch category products from Fake Store API.
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
} from "./actionType";

// ---------- Async thunk actions: fetch category products from API ----------

export const fetchElectronics = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/category/electronics");
      const data = await res.json();
      dispatch({ type: ELECTRONICS, payload: data });
    } catch (error) {
      console.error("Error fetching Electronics:", error);
    }
  };
};

export const fetchWomens = () => async (dispatch) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/category/women's clothing");
    const data = await res.json();
    dispatch({ type: WOMENS, payload: data });
  } catch (error) {
    console.error("Error fetching Womens:", error);
  }
};

export const fetchMens = () => async (dispatch) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/category/men's clothing");
    const data = await res.json();
    dispatch({ type: MENS, payload: data });
  } catch (error) {
    console.error("Error fetching Mens:", error);
  }
};

export const fetchJewellerys = () => async (dispatch) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/category/jewelery");
    const data = await res.json();
    dispatch({ type: JEWELLERYS, payload: data });
  } catch (error) {
    console.error("Error fetching Jewellerys:", error);
  }
};

// ---------- Cart action creators ----------

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});

// ---------- Wishlist / favorites action creators ----------

export const addToFavorite = (product) => ({
  type: ADD_TO_FAVORITE,
  payload: product,
});

export const removeFromFavorite = (id) => ({
  type: REMOVE_FROM_FAVORITE,
  payload: id,
});