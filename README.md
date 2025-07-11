# 📈 IPO Live Tracker MERN

A powerful web app that tracks and displays real-time data of all ongoing and upcoming IPOs in India. This project uses **web scraping**, **MongoDB Atlas**, **Node.js**, and a modern React.js frontend to give users instant GMP updates and IPO info — all in one place.

![Status](https://img.shields.io/badge/status-live-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![PRs](https://img.shields.io/badge/PRs-welcome-yellow)

> 🔗 Live Demo: https://ipo-live-tracker.netlify.app/feedback

---

## 🚀 Features

- 🔍 **Live GMP Tracking** of all Ipos's
- 📅 **Open/Close Dates, Lot Size, Price Band, BoA & Listing Date**
- 📊 **Real-time MongoDB Updates** via Cron Job
- 📦 **Node.js + Express Backend**
- ⚛️ **React.js + Tailwind Frontend**
- 🧠 **Dynamic Filtering & Clean UI**
- 🌐 **Hosted on Render (backend) + Railway (optional)**

---

## 🧰 Tech Stack

| Frontend | Backend | Scraping | Database |
|---------|---------|----------|----------|
| React.js | Node.js + Express | Puppeteer + Cheerio | MongoDB Atlas |

Other tools: `dotenv`, `node-cron`, `cors`, `chrome-aws-lambda` (for serverless deploy)

---

## 📸 Screenshots

<!-- Replace below image URLs with your actual screenshots -->
| Home Page | GMP Table View |
|-----------|----------------|
| ![Home](<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/4b5fdb65-2fbb-4b9d-8268-2bd1a4da8966" />) 
| ![Table](<img width="1919" height="884" alt="image" src="https://github.com/user-attachments/assets/79daf8f9-f89b-405f-b54e-e35cea08c1dd" />)
| ![Table] (<img width="979" height="796" alt="image" src="https://github.com/user-attachments/assets/56a06422-ec93-49a6-a3f6-0f4a9495bde0" />)

---

## 📁 Folder Structure
root/
│
├── client/ # React frontend
├── server/ # Express backend
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ └── scripts/ # Web scraping logic
├── .env
└── README.md

---

## ⚙️ Setup Locally

```bash
# Clone the repo
git clone https://github.com/pranav-0504/IPO-s-Live-Tracker.git

# Go to backend
cd IPO-s-Live-Tracker/server
npm install

# Go to frontend
cd ../client
npm install

# Start backend
npm run dev

# Start frontend
npm start

🌍 Environment Variables
In /server/.env:
  MONGO_URI=your_mongodb_connection_string
  NODE_ENV=development
  PORT=your_backend_port

In /client/.env (optional if using proxy):
  REACT_APP_BACKEND_URL=http://localhost:PORT

⏱ Deployment Setup (Render + Railway)
  1. Backend: Deployed on Render
  2. Scraper + MongoDB Update: Runs via node-cron every 15 mins
  3. Frontend (Optional): Deploy to Netlify/Vercel
  4. Bonus: Keep Render alive with cron ping (/api/scrape every 2 mins)


📌 To-Do (Future Enhancements)
 1. Add login/signup for tracking favorite IPOs
 2. Add email alerts when IPO GMP changes
 3. Live Subscription Detailed Stats from NSE/BSE
 4. Graphs 📈 for GMP trends over time

💻 Author
Made with 💙 by Pranav Aggarwal
GitHub
LinkedIn (Add if you want)
Portfolio (Optional)



