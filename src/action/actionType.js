/**
 * actionType.js - Redux action type constants
 * Central place for all action type strings to avoid typos and enable refactoring.
 * Used by actions (action.js) and reducer (reducer.js).
 */

// Category data from API
export const ELECTRONICS = "ELECTRONICS";
export const WOMENS = "WOMENS";
export const MENS = "MENS";
export const JEWELLERYS = "JEWELLERYS";

// Cart actions
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

// Wishlist / favorites
export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE";