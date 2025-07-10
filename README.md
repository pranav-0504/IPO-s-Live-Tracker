## ✅ Final `README.md` for Your Project

```markdown
# 📈 IPO Live Tracker MERN

A powerful web app that tracks and displays real-time data of all ongoing and upcoming IPOs in India. This project uses **web scraping**, **MongoDB Atlas**, **Node.js**, and a modern React.js frontend to give users instant GMP updates and IPO info — all in one place.

![Status](https://img.shields.io/badge/status-live-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![PRs](https://img.shields.io/badge/PRs-welcome-yellow)

> 🔗 Live Demo: [ipo-s-live-tracker.onrender.com](https://ipo-s-live-tracker.onrender.com)

---

## 🚀 Features

- 🔍 **Live GMP Tracking** from [InvestorGain](https://www.investorgain.com/)
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
| ![Home](./screenshots/home.png) | ![Table](./screenshots/table.png) |

---

## 📁 Folder Structure

```

root/
│
├── client/        # React frontend
├── server/        # Express backend
│   ├── models/    # Mongoose models
│   ├── routes/    # Express routes
│   └── scripts/   # Web scraping logic
├── .env
└── README.md

````

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
````

---

## 🌍 Environment Variables

In `/server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=your_backend_port
```

In `/client/.env` (optional if using proxy):

```env
REACT_APP_BACKEND_URL=http://localhost:PORT
```

---

## ⏱ Deployment Setup (Render + Railway)

* **Backend:** Deployed on [Render](https://render.com)
* **Scraper + MongoDB Update:** Runs via `node-cron` every 15 mins
* **Frontend (Optional):** Deploy to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
* **Bonus:** Keep Render alive with cron ping (`/api/scrape` every 2 mins)

---

## 📌 To-Do (Future Enhancements)

* [ ] Add **login/signup** for tracking favorite IPOs
* [ ] Add **email alerts** when IPO GMP changes
* [ ] **Live Subscription Stats** from NSE/BSE
* [ ] Graphs 📈 for GMP trends over time

---

## 🙏 Acknowledgements

* [InvestorGain](https://www.investorgain.com/) for GMP data
* [MongoDB Atlas](https://www.mongodb.com/atlas/database) free tier hosting
* [Render](https://render.com/) for backend deployment

---

## 💻 Author

Made with 💙 by **Pranav Aggarwal**

* [GitHub](https://github.com/pranav-0504)
* [LinkedIn](https://linkedin.com/in/your-link) *(Add if you want)*
* [Portfolio](https://your-portfolio.com) *(Optional)*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```

---

## ✅ What to Do Now

1. Save this as `README.md` in the root folder of your repo.
2. Add screenshots inside `/screenshots/` or host them externally via Imgur/GitHub.
3. Push the changes to GitHub.
4. Your repo will now look **professional and deploy-ready** ✨

Bhai, yeh tera project now looks like **a serious portfolio-level** submission. Agar aur koi section chahiye ho jaise badges, blog post link, demo video, etc. — toh bol dena.
```
