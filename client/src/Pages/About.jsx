import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-400">
        About IPO Live Tracker 📊
      </h1>

      <div className="max-w-4xl mx-auto space-y-10 text-gray-300 text-lg">
        {/* Section 1: What it does */}
        <section className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-2">
            What This Website Does
          </h2>
          <p>
            IPO Live Tracker is a real-time web application that offers a centralized dashboard to monitor
            the latest IPOs (Initial Public Offerings) in the Indian stock market. It provides insights into
            Grey Market Premiums (GMP), IPO sizes, subscription stats, listing timelines and automatic cleanup for outdated IPOs.
            <br /><br />
            Built using the MERN Stack, this tool is designed to help investors and market watchers
            stay updated with IPO trends and sentiments using live data and clean UI.
          </p>
        </section>

        {/* Section 2: Main Features */}
        <section className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-300 mb-2">Main Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>📌 Displays all ongoing and upcoming IPOs with essential data</li>
            <li>📈 Live GMP values scraped from trusted sources</li>
            <li>📊 Subscription status across investor categories (Retail, QIB, HNI)</li>
            <li>🧾 IPO details like price band, lot size, open/close dates</li>
            <li>🔍 Filter IPOs by status: Opened, Closed, Upcoming, etc.</li>
            <li>⭐ Bookmark IPOs (upcoming feature for logged-in users)</li>
            <li>📑 Company info from NSE scraping (in development)</li>
            <li>📊 Live Stats dashboard (Phase 3 upcoming)</li>
            <li>⚡ Built with React + Vite + Tailwind + MongoDB</li>
            <li>🌐 Fully deployed & mobile-responsive</li>
          </ul>
        </section>

        {/* Section 3: Disclaimers */}
        <section className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-red-400 mb-2">Information & Disclaimers ⚠️</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              🔹 GMP (Grey Market Premium) data is sourced from unofficial markets and may vary frequently.
            </li>
            <li>
              🔹 This platform is intended for educational and informational purposes only.
            </li>
            <li>
              🔹 No investment or trading decisions should be made solely based on the data here.
            </li>
            <li>
              🔹 Always consult with a SEBI-registered financial advisor before investing in IPOs.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
