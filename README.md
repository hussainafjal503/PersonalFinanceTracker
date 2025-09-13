# 📊 Personal Finance Tracker

A full-stack web application to manage and track your personal finances.  
It helps users record **income** and **expenses**, monitor **balance**, and maintain financial discipline with a clean UI and secure backend.

---

## ✨ Features

- Add, update, and delete income & expense records  
- Dashboard view with total income, total expense, and balance  
- Filter transactions by category, type, or date  
- Responsive and user-friendly interface  
- SweetAlert popups for smooth user interaction and alerts  
- Secure backend with environment-based configuration  

---

## 🛠 Tech Stack

**Frontend:** HTML, React.js, JavaScript, CSS, Axios, SweetAlert  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Other Tools:** dotenv, cors, body-parser  

---

## ⚙️ Installation & Setup (Single Command Block)

Follow these steps to run the project locally. All commands are in **one block** for easy copy-paste:

```bash
# Clone the repository
git clone https://github.com/hussainafjal503/PersonalFinanceTracker.git
cd PersonalFinanceTracker

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../FrontEnd
npm install

# Create .env file inside Backend folder with the following keys:
# PORT=<your backend port, e.g. 5000>
# MONGODB_URL=<your MongoDB connection string>
# FRONTEND_URL=<frontend URL for CORS, e.g. http://localhost:3000>

# Run backend and frontend (open two terminals OR use terminal multiplexer)
# Terminal 1: Backend
cd ../Backend
npm start

# Terminal 2: Frontend
cd ../FrontEnd
npm start
