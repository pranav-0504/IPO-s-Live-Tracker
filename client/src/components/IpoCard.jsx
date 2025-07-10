import React from 'react';

const IpoCard = ({ ipo }) => {
  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-700 shadow-md p-5 hover:shadow-xl transition-transform transform hover:-translate-y-1 font-poppins text-sm text-gray-300">
      <h2 className="text-xl font-semibold text-green-400 mb-3 hover:underline cursor-pointer">
        {ipo.name}
      </h2>

      <div className="space-y-2">
        <p><span className="font-medium text-gray-400">GMP:</span> <span className="font-semibold text-green-400">{ipo.gmp}</span></p>
        <p><span className="font-medium text-gray-400">IPO Size:</span> <span className="text-white">{ipo.ipoSize}</span></p>
        <p><span className="font-medium text-gray-400">Price:</span> <span className="text-white">₹{ipo.price}</span></p>
        <p><span className="font-medium text-gray-400">Lot Size:</span> <span className="text-white">{ipo.lotSize}</span></p>
        <p><span className="font-medium text-gray-400">Subscription:</span> <span className="text-white">{ipo.sub}</span></p>
        <p><span className="font-medium text-gray-400">Listing Date:</span> <span className="text-white">{ipo.listingDate}</span></p>
        <p>
          <span className="font-medium text-gray-400">Open:</span> <span className="text-white">{ipo.openDate}</span> &nbsp;|&nbsp;
          <span className="font-medium text-gray-400">Close:</span> <span className="text-white">{ipo.closeDate}</span>
        </p>
      </div>

      <p className="text-[11px] text-gray-500 mt-4 italic">
        Updated: {new Date(ipo.gmpUpdatedAt).toLocaleString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour12: true,
          timeZone: 'Asia/Kolkata'
        })}
      </p>
    </div>
  );
};

export default IpoCard;

