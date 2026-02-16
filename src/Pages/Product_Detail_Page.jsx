/**
 * Product_Detail_Page.jsx - Single product detail view
 * Product is passed via React Router location.state (from ProductCard click).
 * Shows image, title, discounted price, rating, description, category; Add to Cart and Add to Wishlist.
 */

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../action/action";
import { addToFavorite } from "../action/action";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const discountPercent = 20;
  const discountedPrice = (
    product.price - (product.price * discountPercent) / 100
  ).toFixed(2);

  const dispatch = useDispatch();
  const handleAddtoCart = () => dispatch(addToCart(product));
  const handleAddtoWishlist = () => dispatch(addToFavorite(product));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
        Back to Home
      </button>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-96 object-contain rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-red-600">${discountedPrice}</span>
            <span className="text-lg text-gray-500 line-through">${product.price}</span>
            <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
              {discountPercent}% off
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating?.rate || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Category</h3>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-lg  transition-colors" onClick={handleAddtoCart}>
              Add to Cart
            </button>
            <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-lg  transition-colors" onClick={handleAddtoWishlist}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
