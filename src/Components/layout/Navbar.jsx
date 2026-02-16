/**
 * Navbar.jsx - Category navigation bar below header
 * Desktop: "Browse Categories" + category links (Electronics, Women's, Men's, Jewellery) + UserLocation.
 * Mobile: hamburger opens a slide-out drawer with category links.
 */

import { useState } from "react";
import UserLocation from "./UserLocation";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 h-13 md:h-16 flex md:items-center justify-between z-30">
      {/* Hamburger / Browse Categories: opens mobile drawer */}
      <div
        className="flex items-center bg-orange-400 md:gap-2 h-full cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <button>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/menu--v1.png"
            alt="menu icon"
          />
        </button>
        <span className="font-semibold md:text-lg text-sm">
          Browse Categories
        </span>
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center flex-1 justify-evenly text-white">
        <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer " onClick={() => navigate("/electronics")}>
          <button className="font-medium">ELECTRONICS</button>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
            alt="chevron-down"
          />
        </div>

        <div className="flex items-center gap-1 hover:text-orange-400  cursor-pointer" onClick={() => navigate("/womens")}>
          <button className="font-medium">WOMENS'S CLOTHING</button>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
            alt="chevron-down"
          />
        </div>

        <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer" onClick={() => navigate("/mens")}>
          <button className="font-medium">MEN'S CLOTHING</button>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
            alt="chevron-down"
          />
        </div>

        <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer" onClick={() => navigate("/jewellerys")}>
          <button className="font-medium">JEWELLERY</button>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
            alt="chevron-down"
          />
        </div>

      
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
          <div className="p-4 border-b flex justify-between">
            <h2 className="font-bold">Categories</h2>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <ul className="p-4 space-y-2">
            <li className="hover:bg-orange-400 p-2 rounded"  onClick={() => navigate("/electronics")}>Electronics</li>
            <li className="hover:bg-orange-400 p-2 rounded" onClick={() => navigate("/womens")}>
              Women's Clothing
            </li>
            <li className="hover:bg-orange-400 p-2 rounded" onClick={() => navigate("/mens")}>Men's Clothing</li>
            <li className="hover:bg-orange-400 p-2 rounded" onClick={() => navigate("/jewellerys")}>Jewellery</li>
          </ul>
        </div>
      )}

      <UserLocation />
    </nav>
  );
};

export default Navbar;
