import React, { useState } from "react";

const Feedback = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-400">
        📝 We value your feedback!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
