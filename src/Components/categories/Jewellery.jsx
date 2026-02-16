/**
 * Jewellery.jsx - Jewellery category page
 * Fetches jewellery from Fake Store API via Redux. Intentionally delays showing products by 5 seconds
 * (simulated loading) then renders a grid of ProductCards.
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJewellerys, addToCart, addToFavorite } from "../../action/action";
import ProductCard from "../ProductCard";
import { useNavigate } from "react-router-dom";

function Jewellery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jewellerys = useSelector((state) => state.Jewellerys);
  const [delayedJewellerys, setDelayedJewellerys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated delay: show products only after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedJewellerys(jewellerys);
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [jewellerys]);

  
  useEffect(() => {
    dispatch(fetchJewellerys());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleFavorite = (item) => {
    dispatch(addToFavorite(item));
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 mt-8 cursor-pointer"
      >
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png"
          alt="circled-left-2"
        />
        Back to Home
      </button>

      <section className="mt-12 mb-12">
        <h2 className="text-lg sm:text-xl font-bold bg-gray-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded">
          Jewellery
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            {/* Tailwind spinner */}
            <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {delayedJewellerys.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={handleAddToCart}
                onAddToFavorite={handleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Jewellery;
