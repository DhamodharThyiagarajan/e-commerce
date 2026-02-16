/**
 * Banner.jsx - Home page hero: image carousel, category shortcuts, promo countdown, and feature cards
 * Carousel auto-advances every 3s; countdown ticks every 1s. Category icons navigate to category routes.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Countdown state for "Deals of This Month"
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 10,
    minutes: 50,
    seconds: 10,
  });

  const images = [
    "https://www.creativefabrica.com/wp-content/uploads/2021/04/26/Creative-Fashion-Sale-Banner-Graphics-11345601-1.jpg",
    "https://www.cheapticket.in/uploads/search_banner/005196800-1710483941-promo-D-Flights-1-for-CT.jpg",
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="p-4 sm:p-8 space-y-10">
      {/* Image carousel: horizontal slide by currentIndex */}
      <div className="w-full overflow-hidden h-60 lg:h-[1200px] rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Banner ${idx}`}
              className="w-full flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>


      {/* Category shortcuts: navigate to category pages */}
      <div className="flex flex-wrap justify-center gap-6 py-6">
        <div className="flex flex-col items-center w-1/2 sm:w-auto" onClick={() => navigate("/electronics")}>
    <img
      src="https://img.icons8.com/ios/50/electronics.png"
      alt="Electronics"
      className="w-16 h-16"
    />
    <p className="mt-2 text-sm font-semibold text-gray-700">Electronics</p>
  </div>

 
  <div className="flex flex-col items-center w-1/2 sm:w-auto" onClick={() => navigate("/womens")}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/3534/3534317.png"
      alt="Women's Clothing"
      className="w-16 h-16"
    />
    <p className="mt-2 text-sm font-semibold text-gray-700">Women's Clothing</p>
  </div>

 
  <div className="flex flex-col items-center w-1/2 sm:w-auto" onClick={() => navigate("/mens")}>
    <img
      src="https://tse4.mm.bing.net/th/id/OIP.HsYO8VpEYYF2fIMzAb23pAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3"
      alt="Men's Clothing"
      className="w-16 h-16"
    />
    <p className="mt-2 text-sm font-semibold text-gray-700">Men's Clothing</p>
  </div>

 
  <div className="flex flex-col items-center w-1/2 sm:w-auto" onClick={() => navigate("/jewellerys")}>
    <img
      src="https://img.icons8.com/ios/50/jewelry.png"
      alt="Jewellery"
      className="w-16 h-16"
    />
    <p className="mt-2 text-sm font-semibold text-gray-700">Jewellery</p>
  </div>
</div>


      {/* Promo block with countdown */}
      <div className="bg-white p-2 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-2">
          GET UP TO 20% DISCOUNT
        </h2>
        <h3 className="text-lg font-semibold mb-2">Deals of This Month</h3>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
          Shop your favorite products at unbeatable prices. Limited-time offers
           available across electronics, fashion, and more. Don’t miss out on
           exclusive deals this month!
        </p>

        <div className="flex justify-center gap-6 text-center text-gray-700 font-semibold text-sm">
          <div>
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div>Days</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div>Hours</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div>Mins</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div>Secs</div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-2">🚚 Free Shipping</h4>
          <p className="text-sm text-gray-600">
            Free shipping on all orders over ₹999
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-2">💸 100% Money Back</h4>
          <p className="text-sm text-gray-600">
            Return products within 7 days for full refund
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-2">🎁 20% Off First Order</h4>
          <p className="text-sm text-gray-600">
            Sign up and get 20% off instantly
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-2">📞 24/7 Support</h4>
          <p className="text-sm text-gray-600">
            We're here to help anytime, anywhere
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
