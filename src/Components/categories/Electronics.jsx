/**
 * Electronics.jsx - Electronics category page
 * Fetches electronics from Fake Store API via Redux, then renders a grid of ProductCards.
 * Back to Home, Add to Cart, and Add to Favorite dispatch Redux actions.
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectronics } from "../../action/action";
import ProductCard from "../ProductCard";
import { addToCart, addToFavorite } from "../../action/action";
import { useNavigate } from "react-router-dom";

function Electronics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const electronics = useSelector((state) => state.Electronics);

  useEffect(() => {
    dispatch(fetchElectronics());
  }, [dispatch]);


  const handleAddToCart = (item) => { 
    dispatch(addToCart(item));
   }; 
 
   const handleFavorite = (item) => { 
    dispatch(addToFavorite(item));

  };


  return (
    <>
     <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6  transition-colors mt-8 cursor-pointer"
      >
        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
        Back to Home
      </button>
    <section className="mt-12 mb-12">
      <h2 className="text-lg sm:text-xl font-bold bg-gray-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded">
        Electronics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 ">
        {electronics.map((item) => (
          <ProductCard key={item.id} product={item} onAddToCart={handleAddToCart}  onAddToFavorite={handleFavorite}/>
        ))}
      </div>
    </section>
    </>
  );
}

export default Electronics;

