# Chatify 

Chatify is a **full-stack real-time chat application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.io** for live messaging.  
It allows users to register, log in, set up profiles, and chat with other users in real-time, providing a smooth and interactive messaging experience.

---

## Features

- User signup and login with **JWT authentication**  
- Protected routes for authenticated users  
- Set up user profile  
- Real-time chat using **Socket.io**  
- Join specific chats and send messages  
- Responsive frontend with React  
- Backend with Node.js, Express, and MongoDB  
- Persistent chat history stored in MongoDB  

---

## Tech Stack

**Frontend:**  
- React  
- React Router  
- CSS  

**Backend:**  
- Node.js  
- Express.js  
- Socket.io  
- MongoDB with Mongoose  
- JWT Authentication  

---
# 1️.  Clone the repository
git clone https://github.com/rudra-1027/Chatify.git
cd Chatify

# 2️.  Backend setup
cd backend
npm install

# 3.  Create a .env file in the backend folder with the following content:
# (replace with your actual secret keys)
MONGO_DB_URL=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY_CLOUDINARY=your_cloudinary_api_key
API_SECRET_CLOUDINARY=your_cloudinary_api_secret


# 4.  Build frontend for production
cd ../frontend/vite-project
npm install
npm run build

# 5️.  Start backend server
cd ../../backend
npm run dev

# 6️.  Open your browser and go to:
# http://localhost:5000





