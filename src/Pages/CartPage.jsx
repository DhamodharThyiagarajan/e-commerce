/**
 * CartPage.jsx - Shopping cart page
 * Lists cart items from Redux with image, title, discounted price, quantity controls (+/−), and remove.
 * Shows coupon input, shipping options (free / standard / express), total, and checkout / continue shopping.
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../action/action";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const discountPercent = 20;
  const discountedPrice = (price) =>
    (price - (price * discountPercent) / 100).toFixed(2);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + discountedPrice(item.price) * item.quantity,
    0,
  );

  const onhandleRemove = (id) => dispatch(removeFromCart(id));
  const onhandleIncrease = (id) => dispatch(increaseQuantity(id));
  const onhandleDecrease = (id, quantity) =>
    quantity > 1 ? dispatch(decreaseQuantity(id)) : dispatch(removeFromCart(id));

  const [shipping, setShipping] = React.useState(0);
  const [coupon, setCoupon] = React.useState("");

  return (
    <div className="bg-white p-6 lg:p-10 max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
        <button
          className="text-gray-600 hover:text-gray-900 text-xl"
          onClick={() => navigate("/")}
        >
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>

                    <p className="text-gray-600">
                      ₹{discountedPrice(item.price)}
                      <span className="line-through text-sm text-gray-400 ml-2">
                        ${item.price}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => onhandleDecrease(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => onhandleIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-2 sm:mt-0 text-red-500 hover:text-red-700"
                  onClick={() => onhandleRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4 items-center">
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
              Apply
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Shipping:</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  value={0}
                  checked={shipping === 0}
                  onChange={() => setShipping(0)}
                />
                Free Shipping $0.00
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  value={10}
                  checked={shipping === 10}
                  onChange={() => setShipping(10)}
                />
                Standard $10.00
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  value={20}
                  checked={shipping === 20}
                  onChange={() => setShipping(20)}
                />
                Express $20.00
              </label>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-xl font-semibold">
              ${(totalPrice + shipping).toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-orange-600">
              Proceed to Checkout
            </button>
            <button
              className="w-full sm:w-auto border border-gray-400 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
