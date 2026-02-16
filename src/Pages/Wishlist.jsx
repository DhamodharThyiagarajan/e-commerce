/**
 * Wishlist.jsx - Wishlist / favorites page
 * Shows items from Redux favorites. Each item: image, name, price, stock status.
 * Actions: Add to Cart, Remove from wishlist. Uses item.name for display (API may use title).
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromFavorite, addToCart } from "../action/action";

const Wishlist = () => {
  const favoriteItems = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const discountPercent = 20;
  const discountedPrice = (price) =>
    (price - (price * discountPercent) / 100).toFixed(2);

  const onRemovefromFavorite = (id) => {
    dispatch(removeFromFavorite(id));
  };

  const onAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-white p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Wishlist</h2>
        <button
          className="text-gray-600 hover:text-gray-900 text-xl"
          onClick={() => navigate("/")}
        >
          ✕
        </button>
      </div>

      {favoriteItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover mb-4"
                />
              )}

              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>

              <p className="text-gray-700 mb-1">
                ${discountedPrice(item.price)}{" "}
                <span className="line-through text-sm text-gray-400 ml-2">
                  ₹{item.price}
                </span>
              </p>

              <p
                className={`mb-2 text-sm font-medium ${
                  item.inStock ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.inStock ? "In stock" : "Out of stock"}
              </p>

              
              {item.inStock ? (
                item.hasOptions ? (
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mb-2"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    Select Options
                  </button>
                ) : (
                  <button
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 mb-2"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                )
              ) : (
                <button
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed mb-2"
                  disabled
                >
                  Out of Stock
                </button>
              )}

              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => onRemovefromFavorite(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
