WTWR (What to Wear?) — Back End
🎥 Project Pitch Video

Check out this video : (https://www.loom.com/share/8762587628374cbcb4a02497041a4fa4)
 where I walk through the project, explain architectural decisions, and discuss challenges I encountered during development.

This project demonstrates my ability to design and deploy secure, production-ready backend systems, build RESTful APIs, and integrate authentication with a modern frontend application.


📌 Project Overview
The WTWR (What to Wear?) backend powers a full-stack wardrobe application that allows users to:
Register and authenticate securely
Manage user profiles
Create, like, and delete clothing items
Persist data using MongoDB
Interact with a protected API consumed by a React frontend
The backend is built with scalability, security, and maintainability in mind and is deployed on a remote Linux server.


🧱 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt (password hashing)

PM2 (process management)

Nginx (reverse proxy)

ESLint (Airbnb style guide)


🔐 Authentication & Security

Passwords are hashed using bcrypt

Authentication is handled via JSON Web Tokens (JWT)

Protected routes require a valid token

Centralized error handling middleware is implemented

Environment variables are used for sensitive configuration


🌐 API Endpoints (Summary)
Users

POST /signup — Register a new user

POST /signin — Log in and receive JWT

GET /users/me — Get current user profile

PATCH /users/me — Update profile info

Clothing Items

GET /items — Get all clothing items

POST /items — Create a new item (auth required)

DELETE /items/:itemId — Delete an item (owner only)

PUT /items/:itemId/likes — Like an item

DELETE /items/:itemId/likes — Remove like


🚀 Deployment

The backend is deployed on a Linux virtual machine using:

PM2 for process management

Nginx as a reverse proxy

HTTPS enabled via SSL

The server is configured to automatically restart on failure or reboot.


🔗 Related Links

Backend Repository:
https://github.com/mistertomy11-creator/se_project_xpress

Frontend Repository:
https://github.com/mistertomy11-creator/se_project_react

Live Application:
🌐 https://wisw.jumpingcrab.com
