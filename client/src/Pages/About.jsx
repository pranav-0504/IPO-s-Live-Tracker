import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-green-400 drop-shadow-md">
        📊 About IPO Live Tracker
      </h1>

      <div className="max-w-5xl mx-auto space-y-12 text-gray-300 text-lg">
        {/* Section 1: What it does */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">
            🧠 What This Website Does
          </h2>
          <p className="leading-relaxed">
            IPO Live Tracker is a real-time web application that offers a centralized dashboard to monitor
            the latest IPOs (Initial Public Offerings) in the Indian stock market. It provides insights into
            <strong> Grey Market Premiums (GMP), IPO sizes, subscription stats, listing timelines</strong>, and automatic cleanup for outdated IPOs.
            <br /><br />
            Built using the <span className="text-green-400 font-semibold">MERN Stack</span>, this tool is crafted to help investors stay informed with IPO trends and sentiments via live data and modern UI.
          </p>
        </section>

        {/* Section 2: Main Features */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">🛠️ Main Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>📌 Displays all ongoing and upcoming IPOs with essential data</li>
            <li>📈 Live GMP values scraped from trusted sources</li>
            <li>📊 Subscription status across investor categories (Retail, QIB, HNI)</li>
            <li>🧾 IPO details like price band, lot size, open/close dates</li>
            <li>🔍 Filter IPOs by status: Opened, Closed, Upcoming</li>
            <li>⭐ Bookmark IPOs (upcoming feature for logged-in users)</li>
            <li>📑 Company info from NSE scraping (in development)</li>
            <li>📊 Live Stats dashboard (Phase 3 upcoming)</li>
            <li>⚡ Built with React + Vite + Tailwind + MongoDB</li>
            <li>🌐 Fully deployed & mobile-responsive</li>
          </ul>
        </section>

        {/* Section 3: Disclaimers */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            ⚠️ Information & Disclaimers
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🔹 GMP (Grey Market Premium) data is sourced from unofficial markets and may vary frequently.</li>
            <li>🔹 This platform is intended for educational and informational purposes only.</li>
            <li>🔹 No investment or trading decisions should be made solely based on the data here.</li>
            <li>🔹 Always consult with a SEBI-registered financial advisor before investing in IPOs.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
