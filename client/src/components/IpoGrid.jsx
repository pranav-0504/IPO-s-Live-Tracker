// components/IpoGrid.jsx
import React from "react";

const IpoGrid = ({ ipos, wishlist = [], onBookmark, onRemove, showButtons = false }) => {
  const isInWishlist = (ipoId) => wishlist.some((ipo) => ipo._id === ipoId);

  if (ipos.length === 0) {
    return <p className="text-gray-400">No IPOs available currently.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ipos.map((ipo) => (
        <div
          key={ipo._id}
          className="bg-white/5 p-4 rounded-xl border border-white/10 shadow"
        >
          <h3 className="text-md font-semibold mb-1">{ipo.name}</h3>
          <p className="text-sm mb-2">GMP: ₹{ipo.gmp || "N/A"}</p>

          {showButtons && (
            <button
              onClick={() =>
                isInWishlist(ipo._id)
                  ? onRemove(ipo._id)
                  : onBookmark(ipo._id)
              }
              className={`px-4 py-1 rounded text-sm font-medium transition ${
                isInWishlist(ipo._id)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isInWishlist(ipo._id) ? "Remove" : "Bookmark"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default IpoGrid;
