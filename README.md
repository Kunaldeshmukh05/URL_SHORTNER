# 🔗 URL Shortener

A full-stack URL shortener built with **React + Vite**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend Architecture](#-backend-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Postman Collection](#-postman-collection)
- [AI Development Log](#-ai-development-log)
- [Future Improvements](#-future-improvements)

---

## 📌 Overview

This app lets users:

- Create shortened URLs from long URLs
- Redirect through generated short links
- Track click statistics per link
- Get proper validation, error handling, and API protection

---

## ✨ Features

| Category | Feature |
| --- | --- |
| **Core** | Create short URLs |
| | Generate unique short codes |
| | Store URL mappings in MongoDB Atlas |
| | Redirect using short URLs |
| | Track clicks |
| **Validation** | Required URL validation |
| | Invalid URL handling |
| | HTTP/HTTPS protocol validation |
| | Invalid short code handling |
| **Security** | Helmet security headers |
| | CORS configuration |
| | Rate limiting |
| | Environment-based configuration |
 ---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- REST APIs

### Security & Middleware
- Helmet
- CORS
- Express Rate Limiter

---

## 📁 Project Structure

```
url-shortener/
├── client/            # React + Vite frontend
├── server/            # Node.js + Express backend
├── postman.json       # Postman API collection
├── README.md
|__optional.README.md
└── AI_LOG.md
```

---

## 🏗 Backend Architecture

The backend follows a layered architecture:

```
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (recommended)
- npm
- Git

> MongoDB is hosted on MongoDB Atlas, so no local database setup is needed.

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`: Its shared with email

```env  Example- not original- get it from email
PORT=5000
MONGO_URI=<YOUR_MONGODB_ATLAS_CONNECTION_STRING>
DATABASE_NAME=url_shortner
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB Atlas connection string |
| `DATABASE_NAME` | MongoDB database name |
| `BASE_URL` | Base URL used for generated short links |
| `CLIENT_URL` | Frontend URL allowed for CORS |

Start the server:

```bash
npm run dev
```

Backend runs at **http://localhost:5000**

### 2. Frontend Setup

Open a **new terminal**:

```bash
cd client
npm install
```

Create a `.env` file inside `client/`: 

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend API base URL |

Start the frontend:

```bash
npm run dev
```

Frontend runs at **http://localhost:5173**

### 3. Run the App

Start the backend first, then the frontend:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

Then open **http://localhost:5173**.

---

## 📡 API Documentation

### Create Short URL

**`POST /api/urls`**

Request body:

```json
{
  "originalUrl": "https://example.com"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com",
    "shortCode": "bwTMrYV",
    "shortUrl": "http://localhost:5000/bwTMrYV",
    "createdAt": "2026-10-08T16:32:17.972Z"
  }
}
```

Example:

```bash
curl -X POST http://localhost:5000/api/urls \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com"}'
```

### Redirect Short URL

**`GET /:shortCode`**

Redirects the user to the original URL.

```
http://localhost:5000/bwTMrYV
```

### URL Statistics

**`GET /api/urls/:shortCode/stats`**

Returns:

- Original URL
- Short code
- Click count
- Metadata

Example:

```bash
curl http://localhost:5000/api/urls/bwTMrYV/stats
```

---

## 📬 Postman Collection

A ready-to-use collection is included at:

```
postman/URL-Shortener.postman_collection.json
```

It contains:

- Create URL API
- Redirect API
- Statistics API
- Saved successful responses

Import it directly into Postman to start testing.

---

## 🤖 AI Development Log

AI usage and development decisions are documented in [`AI_LOG.md`](./AI_LOG.md), including:

- AI prompts used
- Architecture discussions
- Implementation decisions
- Trade-offs considered

---

## 🔮 Future Improvements

- [ ] User authentication and personal URL management
- [ ] Advanced analytics dashboard
- [ ] Redis caching for frequently accessed URLs
- [ ] Separate click analytics service
- [ ] Production deployment with CI/CD pipeline
