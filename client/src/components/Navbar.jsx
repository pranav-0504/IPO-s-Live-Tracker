import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // <-- React Icons here

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/stats", label: "Live Stats" },
    { to: "/technologies", label: "Technologies Used" },
    { to: "/feedback", label: "Feedback" }, 
  ];

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* === Logo + Title === */}
        <div className="flex items-center gap-3">
          <img
            src="/IPO-LOGO_Project.png"
            alt="IPO Logo"
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <h1 className="text-2xl font-bold text-green-400 tracking-wide">
            IPO Live Tracker
          </h1>
        </div>

        {/* === Nav Links + Icons === */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
          <div className="flex gap-6 text-sm md:text-base font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 border-b-2 border-green-400 pb-1"
                    : "hover:text-green-400 transition"
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Social Icons (GitHub + LinkedIn) */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <a
              href="https://github.com/pranav-0504"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-white hover:text-gray-900 text-white p-2.5 rounded-full transition duration-300"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/pranav-aggarwal-9a9ba1248/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-blue-500 text-white p-2.5 rounded-full transition duration-300"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
