import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import getBackendUrl from "../utils/getBackendUrl";

const backendURL = getBackendUrl();     // Using utility function to get backend URL


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    const backendURL = getBackendUrl(); 
    
    try {
      // const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const res = await axios.post(`${backendURL}/api/auth/login`, formData);
      setMessage(res.data.message || "Login successfully!");

      // Redirect to profile after 1 seconds = 1000 milliseconds
      
      localStorage.setItem("token", res.data.token); //! Store token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user)); //! Store user info in localStorage

      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">🚀 Welcome Back Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg bg-white/10 border border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 text-lg bg-white/10 border border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold rounded-xl"
          >
            Click to Login
          </button>
        </form>

        {message && (
          <div className="mt-6 text-sm text-center text-gray-300">
            {message}
          </div>
        )}

        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
