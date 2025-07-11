import React, { useState } from "react";

const Feedback = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://ipo-s-live-tracker.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Feedback submitted successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      alert("❌ Could not submit feedback.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">
          📝 We value your feedback!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 text-lg bg-white/10 border border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 text-lg bg-white/10 border border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-5 py-3 text-lg bg-white/10 border border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold rounded-xl"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
