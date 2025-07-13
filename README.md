# 🚀 IPO Live Tracker

> A real-time dashboard to track all active & upcoming IPOs in the Indian stock market with live GMP, subscription data, and more.

---

![Banner](<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/b0043d61-8ad1-4dbd-94da-d0cfb7ae8e80" />)

## 📌 About This Project
**IPO Live Tracker** is a real-world full-stack web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that offers a centralized, clean UI to monitor ongoing and upcoming IPOs.

It helps users (especially retail investors and IPO enthusiasts) stay updated with:
- 💹 **Live Grey Market Premium (GMP)**
- 🧾 **Subscription Data (Retail, QIB, HNI)**
- 📅 **Open/Close Dates, Lot Sizes, Price Bands**
- 📊 **Upcoming, Ongoing, Closed IPO filtering**

Live GMP data is scraped from trusted sources using Puppeteer/Cheerio.

---

## 🔥 Key Features

- 📈 **Live GMP & Subscription Stats**
- 🔍 Search IPOs by name and filter by status (Open, Closed, Upcoming)
- 🏷️ Filter by category (Mainboard or SME IPOs)
- 📂 Automatically removes outdated IPOs
- 🧠 Built-in Bookmark/Wishlist feature for logged-in users *(WIP)*
- 📬 Feedback form for users to suggest updates

---

## 💻 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite.js
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Puppeteer / Cheerio for Web Scraping

### Deployment
- Frontend: **Netlify**
- Backend/API: **Render**
- Cron Jobs: **cron-job.org**

---

## 📸 Screenshots

### 🔹 Home (Dashboard with live IPO cards)
![Home](screenshots/home.png)

### 🔹 About Page
![About](screenshots/about.png)

### 🔹 Register / Login Pages
![Register](screenshots/register.png)
![Login](screenshots/login.png)

### 🔹 Tech Stack Page
![Tech](screenshots/techstack.png)

---

## 🧠 Developer Notes

- This project is built with real-world usage in mind.
- Designed for scalability (can be extended to support other market segments).
- Inspired by how actual investors track IPO sentiment daily.

---

## 🌐 Live Website
👉 [ipo-live-tracker.netlify.app](https://ipo-live-tracker.netlify.app)

## 📁 Backend Endpoint
👉 [https://ipo-s-live-tracker.onrender.com/api/scrape](https://ipo-s-live-tracker.onrender.com/api/scrape)

---

## 🤝 Contribution
Pull requests are welcome! Open issues to suggest features or report bugs.

---

## 📬 Contact
Created by [**Pranav Aggarwal**](https://www.linkedin.com/in/pranav-aggarwal04) – feel free to reach out for collaborations!

---

> ⭐ Don’t forget to **Star** the repo if you like it!
