/**
 * Footer.jsx - Site footer with "Back to top", link sections, and copyright
 * Link columns: Get to Know Us, Make Money with Us, Let Us Help You, Connect with Us.
 */

import React from "react";

export default function Footer() {
  return (
    <footer className="text-gray-200">
      {/* Smooth scroll to top of page */}
      <button
        className="w-full bg-gray-700 hover:bg-[#3f5167] transition-colors py-3 text-sm font-medium cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        Back to top
      </button>

      {/* Footer link columns */}
      <div className="bg-gray-800 px-12 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 text-white font-semibold justify-items-center">
        <div className="space-y-2 flex flex-col">
          <p className="text-xl">Get to Know Us</p>
          <a href="/" className="text-xs hover:underline">About ShopEase</a>
          <a href="/" className="text-xs hover:underline">Careers</a>
          <a href="/" className="text-xs hover:underline">Press Releases</a>
        </div>

        <div className="space-y-2 flex flex-col">
          <p className="text-xl">Make Money with Us</p>
          <a href="/" className="text-xs hover:underline">Sell on ShopEase</a>
          <a href="/" className="text-xs hover:underline">Protect and Build Your Brand</a>
          <a href="/" className="text-xs hover:underline">Become an Affiliate</a>
          <a href="/" className="text-xs hover:underline">Advertise Your Products</a>
        </div>

        <div className="space-y-2 flex flex-col">
          <p className="text-xl">Let Us Help You</p>
          <a href="/" className="text-xs hover:underline">Your Account</a>
          <a href="/" className="text-xs hover:underline">Returns Centre</a>
          <a href="/" className="text-xs hover:underline">Recalls and Product Safety Alerts</a>
          <a href="/" className="text-xs hover:underline">100% Purchase Protection</a>
          <a href="/" className="text-xs hover:underline">Help</a>
        </div>

        <div className="space-y-2 flex flex-col">
          <p className="text-xl">Connect with Us</p>
          <a href="https://facebook.com" target="_blank" className="text-xs hover:underline">Facebook</a>
          <a href="https://twitter.com" target="_blank" className="text-xs hover:underline">Twitter</a>
          <a href="https://instagram.com" target="_blank" className="text-xs hover:underline">Instagram</a>
          <div>
            <a href="tel:+918778030580" className="block text-xs hover:underline">Call +91 8778030580</a>
            <span className="text-xs">Dhamodhar</span>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-gray-900 px-2 py-4">
        <p className="text-center text-sm">&copy; 2024 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  )
}
