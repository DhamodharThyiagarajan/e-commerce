/**
 * UserLocation.jsx - Displays user's city based on IP (ipwho.is API)
 * Shown in the Navbar; shows "Detecting location...", city name, or error message.
 */

import { useEffect, useState } from "react";

const UserLocation = () => {
  const [city, setCity] = useState("Detecting location...");
  const [error, setError] = useState("");

  // Fetch location once on mount
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setCity(data.city || data.region || "Unknown location");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to detect location");
      });
  }, []);

  return (
    <div className="flex items-center gap-2 text-white text-sm">
      {error ? (
        <span>📍 {error}</span>
      ) : (
        <span className=" flex items-center mr-6 font-bold text-md "><img width="25" height="25" src="https://img.icons8.com/arcade/64/marker.png" alt="marker"/> {city}</span>
      )}
    </div>
  );
};

export default UserLocation;
