# Flask + React Todo App

A modern **Full-Stack Todo Application** built with **React (frontend)** and **Flask (backend)** using **MongoDB** as the database.  
This project demonstrates **JWT-based authentication**, **CRUD operations**, and seamless API integration between client and server.

---

## 🧩 Features

- ✅ User Signup & Login with JWT Authentication  
- ✅ Add, Edit, Delete, and View Todos  
- ✅ Protected routes with JWT tokens  
- ✅ Responsive UI using React and SCSS  
- ✅ Axios interceptors for automatic token handling  
- ✅ CORS enabled for cross-origin API requests  
- ✅ Logout functionality clears session and token  

---

## ⚙️ Tech Stack

- **Frontend:** React, Formik, Yup, Axios, SCSS  
- **Backend:** Flask, Flask-JWT-Extended, Flask-CORS  
- **Database:** MongoDB  
- **Tools:** VS Code, Postman, Git, Virtualenv

## 🎥 Demo Video

<video src="https://github.com/usama-ansarii/nextjs-todo-app/raw/main/Demo.webm" controls width="600"></video>

🎥 [Click here if the video doesn’t load](https://github.com/usama-ansarii/nextjs-todo-app/raw/main/Demo.webm)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone git@github.com:usama-ansarii/Flask-todo-app.git
cd Flask-todo-app

2️⃣ Backend Setup
cd backend
python -m venv venv          # create virtual environment
source venv/bin/activate     # activate venv (Linux/Mac)
venv\Scripts\activate        # activate venv (Windows)
pip install -r requirements.txt
python app.py


3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
