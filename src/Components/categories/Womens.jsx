/**
 * Womens.jsx - Women's clothing category page
 * Fetches women's clothing from Fake Store API via Redux; renders grid of ProductCards on a background image.
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { fetchWomens } from "../../action/action";
import { addToCart, addToFavorite } from "../../action/action";
import { useNavigate } from "react-router-dom";

function Womens() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const womens = useSelector((state) => state.Womens);

  useEffect(() => {
    dispatch(fetchWomens());
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
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 mt-8 cursor-pointer"
      >
        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
        Back to Home
      </button>
        <section
        className="mt-12 mb-12 relative min-h-[400px] sm:min-h-[600px] lg:min-h-[900px] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://wallpapercave.com/wp/wp11384098.jpg')",
        }}
      >
        <h2 className="text-lg sm:text-xl font-bold bg-gray-800 text-white py-2 sm:py-3 px-3 sm:px-4 rounded">
          Women's Clothing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {womens.map((item) => (
            <ProductCard key={item.id} product={item}  onAddToCart={handleAddToCart} onAddToFavorite={handleFavorite} />
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default Womens
