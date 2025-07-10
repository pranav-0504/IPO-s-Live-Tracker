import React, { useState, useEffect } from "react";
import axios from "axios";
import IpoCard from "../components/IpoCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const IpoList = () => {
  const [ipos, setIpos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [statusType, setStatusType] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/ipos")
      .then(res => {
        console.log("Fetched IPOs:", res.data);
        setIpos(res.data);
      })
      .catch(err => console.error("Error fetching IPOs:", err.message));
  }, []);

  const filteredIpos = [...ipos]
    .reverse()
    .filter((ipo) => {
      const matchesSearch = ipo.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" ||
        (filterType === "mainboard" && ipo.ipoType === "Mainboard") ||
        (filterType === "sme" && ipo.ipoType === "SME");
      const matchesStatus = statusType === "all" || ipo.name.endsWith(statusType.toUpperCase());
      return matchesSearch && matchesFilter && matchesStatus;
    });

  return (
    // <div className="min-h-screen bg-gray-950 text-gray-100 px-4 sm:px-6 md:px-10 py-10 font-sans">
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200 px-4 sm:px-6 md:px-10 py-10 font-sans border-t border-gray-800">

      <h1 className="text-4xl font-bold text-center mb-10 text-white font-serif">All Live IPO's GMP's</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search IPO by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Filter Tabs for Mainboard/SME */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${filterType === "all" ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
        >
          All IPOs
        </button>
        <button
          onClick={() => setFilterType("mainboard")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${filterType === "mainboard" ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
        >
          Mainboard IPOs
        </button>
        <button
          onClick={() => setFilterType("sme")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${filterType === "sme" ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400'}`}
        >
          SME IPOs
        </button>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {[{ label: "All Status", value: "all" }, { label: "Closing Today", value: "CT" }, { label: "Opened", value: "O" }, { label: "Closed", value: "C" }, { label: "Upcoming", value: "U" }].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setStatusType(value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 ${statusType === value ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-200 border-gray-600 hover:border-green-500'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* IPO Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredIpos.length > 0 ? (
          filteredIpos.map((ipo) => <IpoCard key={ipo._id} ipo={ipo} />)
        ) : (
          <p className="col-span-full text-center text-gray-400">No IPOs match your search.</p>
        )}
      </div>



      {/* Disclaimer Section */}
      <div className="mt-16 bg-gray-900 text-gray-200 rounded-xl shadow-inner p-6 max-w-6xl mx-auto text-sm leading-relaxed tracking-wide border border-gray-700">
        {/* Disclaimer content here */}
        <h2 className="text-xl font-bold text-red-400 mb-4">⚠️ Comprehensive IPO & Investment Disclaimer</h2>

        <p className="mb-4">💹 Investments in the securities market are subject to market risks, including the potential loss of principal. Please read all relevant offer documents, risk disclosures, and financials before investing. Past performance does not guarantee future returns. Invest based on your financial goals and risk appetite.</p>

        <p className="mb-4">📊 <strong>GMP Disclaimer:</strong> Grey Market Premium (GMP) data shown on this platform is purely for educational and informational purposes. We <span className="text-red-300">do not trade, promote, or engage</span> in any form of grey market or subject-to deals. The GMP numbers are speculative and should not form the sole basis for investment decisions.</p>

        <p className="mb-4">📝 <strong>Before Investing:</strong> Always conduct proper due diligence. Review financials, understand the business model, evaluate promoter background, and consult a <span className="text-green-300">SEBI-registered advisor</span> before making investment decisions.</p>

        <p className="mb-4">📉 <strong>SME IPOs Notice:</strong> SME IPOs carry high volatility, limited institutional support, and higher risk. SEBI suggests participation only by informed investors. The project and author have no financial interest in SME IPOs covered.</p>

        <p className="mb-4">📚 <strong>Data Source Disclaimer:</strong> Information on this site is gathered from reliable public sources, but <span className="text-yellow-300">accuracy is not guaranteed</span>. We are not responsible for errors, omissions, or actions taken based on this content.</p>

        <p className="mb-2">📢 This site is for informational use only and does not offer financial services or investment advice.</p>
      </div>


    </div>
  );
};

export default IpoList;
