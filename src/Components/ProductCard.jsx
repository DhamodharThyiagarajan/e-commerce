/**
 * ProductCard.jsx - Reusable card for a single product
 * Shows image (with loading/error), title, discounted price, rating stars, and Add to Cart / Add to fav.
 * Clicking the card body navigates to product details; buttons trigger parent callbacks (Redux actions).
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart, onAddToFavorite }) {
  const navigate = useNavigate();

  // Image load state: show spinner until loaded or error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const discountPercent = 20;
  const discountedPrice = (
    product.price - (product.price * discountPercent) / 100
  ).toFixed(2);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
  };
  const handleAddToFavorite = () => {
    if (onAddToFavorite) onAddToFavorite(product);
  };

  return (
    <div className="rounded-lg shadow-2xl p-4 bg-white cursor-pointer transform transition duration-300 hover:scale-105">
      {/* Card content: click navigates to product detail page with product in location state */}
      <div onClick={() => navigate("/productdetails", { state: { product } })}>
        <div className="h-40 w-full flex items-center justify-center mb-2 relative">
          {loading && !error && (
            <div className="absolute">
              {/* Tailwind spinner */}
              <div className="w-6 h-6 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!error ? (
            <img
              src={product.image}
              alt={product.title}
              className={`h-40 w-full object-contain transition-opacity duration-300 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          ) : (
            <div className="text-gray-500 text-sm">Image not available</div>
          )}
        </div>

        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>

        {/* Price: discounted + original strikethrough + discount badge */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-red-600">${discountedPrice}</span>
          <span className="text-sm text-gray-500 line-through">${product.price}</span>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
            {discountPercent}% off
          </span>
        </div>

        {/* Star rating (5 stars) and review count */}
        <div className="mt-2 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.round(product.rating?.rate || 0) ? "gold" : "transparent"}
              viewBox="0 0 24 24"
              stroke="gold"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 17.27L18.18 21l-1.64-7.03L22 
                9.24l-7.19-.61L12 2 9.19 8.63 
                2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
          <span className="ml-2 text-xs text-gray-600">
            ({product.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Action buttons: do not trigger navigation (stopPropagation not needed as they're outside clickable area) */}
      <div className="mt-3 flex items-center gap-2">
        <button
          className="flex-1 bg-orange-400 hover:bg-orange-500 text-sm font-semibold py-2 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 bg-orange-400 hover:bg-orange-500 text-sm font-semibold py-2 rounded"
          onClick={handleAddToFavorite}
        >
          Add to fav
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
