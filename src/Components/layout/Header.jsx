/**
 * Header.jsx - Top bar with logo, search, auth, cart, and wishlist
 * Fixed at top; shows cart item count and wishlist count from Redux.
 * Searchbar visible on desktop in header, on mobile/tablet below.
 */

import logo from "../../assets/1.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar";

const Header = () => {
  const navigate = useNavigate();

  // Total number of items in cart (sum of quantities)
  const quantity = useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const favorite = useSelector((state) => state.favorites.length);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg w-full z-10">
      <div className="flex items-center justify-between p-4">
        {/* Logo and brand name; click navigates to home */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="E-commerce Logo"
            className="h-12 w-auto md:h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            ShopEase
          </h1>
        </div>

        {/* Search bar: visible on large screens only */}
        <div className="hidden lg:flex flex-grow mx-4">
          <Searchbar />
        </div>

        {/* Auth, cart, and wishlist actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-xs px-2 md:px-3 py-1 md:py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors text-sm md:text-base cursor-pointer" onClick={() => navigate("/form")}>
            sign in / sign up
          </button>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Cart icon with badge showing total items */}
            <div className="relative">
              <button
                aria-label="Cart"
                className="cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <img
                  width="28"
                  height="28"
                  className="md:w-10 md:h-10"
                  src="https://img.icons8.com/ios/50/shopping-cart--v1.png"
                  alt="Cart icon"
                />
              </button>
              {quantity > 0 && (
                <div className="absolute top-0 left-6 w-6 h-6 rounded-full bg-orange-400 text-white text-sm flex items-center justify-center">
                  {quantity}
                </div>
              )}
            </div>

            {/* Wishlist icon with badge */}
            <div className="relative">
              <button
                aria-label="Wishlist"
                className="cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                <img
                  width="28"
                  height="28"
                  className="md:w-10 md:h-10"
                  src="https://img.icons8.com/ios/50/hearts--v1.png"
                  alt="Wishlist icon"
                />
              </button>
              {favorite > 0 && (
                <div className="absolute top-0 left-6 w-6 h-6 rounded-full bg-orange-400 text-white text-sm flex items-center justify-center">
                  {favorite}
                </div>
              )}  
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Search Bar */}
      <div className="flex flex-grow px-4 pb-4 lg:hidden">
        <Searchbar />
      </div>
    </header>
  );
};

export default Header;
