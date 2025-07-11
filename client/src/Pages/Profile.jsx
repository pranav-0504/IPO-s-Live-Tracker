import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import getBackendUrl from "../utils/getBackendUrl";

const Profile = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${getBackendUrl()}/api/user/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (ipoId) => {
    try {
      await axios.delete(`${getBackendUrl()}/api/user/bookmark/${ipoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(wishlist.filter((ipo) => ipo._id !== ipoId));
    } catch (err) {
      console.error("Error removing IPO:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">👤 Welcome, {user?.name || "User"}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">📌 Your IPO Wishlist:</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-400">No IPOs in your wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((ipo) => (
              <div
                key={ipo._id}
                className="bg-white/10 backdrop-blur p-5 rounded-xl border border-white/20 shadow"
              >
                <h3 className="text-lg font-bold text-green-300 mb-2">{ipo.name}</h3>
                <p>💰 GMP: ₹{ipo.gmp || "N/A"}</p>
                <p>📆 Status: {ipo.status}</p>
                <button
                  onClick={() => handleRemove(ipo._id)}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
