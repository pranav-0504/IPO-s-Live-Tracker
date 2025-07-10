import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Text */}
        <p className="text-lg font-semibold mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-green-500">IPO Tracker</span>. All rights reserved.
        </p>

        {/* Right Icons */}
        <div className="flex gap-6">
          <a
            href="https://github.com/pranav-0504"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-white hover:text-gray-900 text-white p-3 rounded-full transition duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/pranav-aggarwal-9a9ba1248/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-blue-500 text-white p-3 rounded-full transition duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="trader.market0504@gmail.com"
            className="bg-gray-800 hover:bg-red-500 text-white p-3 rounded-full transition duration-300"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
