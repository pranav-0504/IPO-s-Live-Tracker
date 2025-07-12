
//! Incomplete Under developlement: problem is frontend part backend thik hai!

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getBackendUrl from "../utils/getBackendUrl";

import IpoGrid from "../components/IpoGrid";

const Profile = () => {
  const [wishlist, setWishlist] = useState([]);
  const [allIpos, setAllIpos] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchData = async () => {
      try {
        const [wishlistRes, allIposRes] = await Promise.all([
          axios.get(`${getBackendUrl()}/api/user/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${getBackendUrl()}/api/ipos`),
        ]);

        console.log("Fetched IPOs:", allIposRes.data); // Debug line

        setWishlist(wishlistRes.data);
        setAllIpos(allIposRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [navigate, token]);

  

  const handleAddToWishlist = async (ipoId) => {
    try {
      await axios.post(`${getBackendUrl()}/api/user/bookmark/${ipoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const addedIpo = allIpos.find((ipo) => ipo._id === ipoId);
      setWishlist((prev) => [...prev, addedIpo]);
    } catch (err) {
      console.error("Error adding IPO:", err);
    }
  };

  const handleRemove = async (ipoId) => {
    try {
      await axios.delete(`${getBackendUrl()}/api/user/bookmark/${ipoId}`, {
        headers: { Authorization: `Bearer ${token}` },
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            👤 Welcome, {user?.username || "User"}!
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">📌 Your IPO Wishlist:</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-400 mb-6">No IPOs in your wishlist yet.</p>
        ) : (
          <IpoGrid
            ipos={wishlist}
            wishlist={wishlist}
            onRemove={handleRemove}
            showButtons={true}
          />
        )}

        <h2 className="text-xl font-semibold mb-4">✨ Explore IPOs to Bookmark:</h2>
        {allIpos.length === 0 ? (
          <p className="text-gray-500"> This Feature Under Development Comming Soon</p>
        ) : (
          <IpoGrid
            ipos={allIpos}
            wishlist={wishlist}
            onBookmark={handleAddToWishlist}
            onRemove={handleRemove}
            showButtons={true}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
