/**
 * Searchbar.jsx - Product search with debounced suggestions
 * Fetches all products from Fake Store API once; filters by title using debounced query (1s delay).
 * Shows dropdown of matching product titles; clicking a suggestion fills the input.
 */

import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [debouncedQuery] = useDebounce(query, 1000);

  // Load all products once on mount for client-side search
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Update suggestions when debounced query or products change
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, products]);

  return (
    <div className="w-full relative">
      <div className="flex w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 border-2 border-gray-500 rounded-l-lg focus:outline-none focus:border-orange-400"
        />
        <button className="px-4 py-2 bg-orange-400 text-white font-semibold rounded-r-lg hover:bg-orange-600 cursor-pointer">
          Search
        </button>
      </div>

      {/* Dropdown: click suggestion to set query to that product title */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => setQuery(item.title)}
              className="px-3 py-2 cursor-pointer hover:bg-orange-100"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Searchbar;
