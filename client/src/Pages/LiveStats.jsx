import React from "react";
import { FaChartLine, FaBusinessTime, FaListOl } from "react-icons/fa";

const LiveStats = () => {
  const stats = [
    {
      title: "Total Active IPOs",
      value: 12,
      icon: <FaBusinessTime size={24} />,
      color: "bg-blue-600",
    },
    {
      title: "Average GMP",
      value: "₹38.25",
      icon: <FaChartLine size={24} />,
      color: "bg-green-600",
    },
    {
      title: "Total Subscriptions",
      value: "894x",
      icon: <FaListOl size={24} />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-400">
        📊 Live IPO Market Stats
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          >
            <div className={`p-4 rounded-full ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-2xl text-green-400 font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for future charts or analytics */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-xl text-gray-300 mb-4">📈 Analytics Coming Soon...</h2>
        <p className="text-gray-500">
          Real-time GMP trends, subscription graphs, and historical data will be added here.
        </p>
      </div>
    </div>
  );
};

export default LiveStats;
