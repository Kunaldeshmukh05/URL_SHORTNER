# URL Shortener — Full Stack Assignment Context

## Project Overview

Built a production-style URL Shortener application as part of the AI Full Stack Developer (MERN) take-home assignment.

The objective was not only to build a working application but also demonstrate:
- Ability to design application architecture
- Effective usage of AI development tools
- Clean engineering practices
- Proper documentation and development workflow


---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript ES6+
- REST API integration


## Backend

- Node.js 24
- Express.js
- MongoDB Atlas
- Mongoose ODM
- ES Module syntax (import/export)


## Security & Middleware

- Helmet
- CORS
- Express Rate Limiter


## Development Tools

- Git/GitHub
- Postman
- MongoDB Atlas


---

# Application Features

## Core Functionality

Users can:

1. Enter a long URL
2. Generate a unique short URL
3. Store URL mapping in MongoDB
4. Visit short URL and get redirected to the original URL
5. Track URL click statistics


---

# Backend Architecture

Backend follows a layered architecture:



Routes
   |
   ↓
Controllers
   |
   ↓
Services
   |
   ↓
Models
   |
   ↓
MongoDB


## Folder Structure


server/
src/
├── config
│   ├── db.js
│
├── models
│   └── url.model.js
│
├── controllers
│   └── url.controller.js
│
├── services
│   └── url.service.js
│
├── routes
│   └── url.routes.js
│
├── middleware
│   ├── errorHandler.js
│   ├── validateUrl.js
│   └── rateLimiter.js
│
├── utils
│   ├── getBaseUrl.js
│   ├── generateCode.js
│   └── ApiError.js
│
├── app.js
└── index.js


---

# Database Design

Database:


url_shortner


Collection:


urls


Schema:

```javascript
{
 originalUrl: String,
 shortCode: String,
 clicks: Number,
 createdAt: Date,
 updatedAt: Date
}

Design Decisions
- shortCode has a unique index
- Prevent duplicate short codes
- Click count updated using atomic increment
- No click history stored inside URL document
- Avoid unnecessary complexity for assignment scope
API Endpoints
Create Short URL
POST
/api/urls

Request:
{
 "originalUrl":"https://example.com"
}

Response:
{
 "success":true,
 "data":{
   "originalUrl":"https://example.com",
   "shortCode":"bwTMrYV",
   "shortUrl":"http://localhost:5000/bwTMrYV",
   "createdAt":"..."
 }
}

Redirect Short URL
GET
/:shortCode

Example:
http://localhost:5000/bwTMrYV

Flow:
shortCode
    |
    ↓
Find URL
    |
    ↓
Increment clicks
    |
    ↓
Redirect user

URL Statistics
GET
/api/urls/:shortCode/stats

Returns:
- Original URL
- Short code
- Click count
Validation & Error Handling
Implemented:
URL Validation
- Required URL field
- Empty input validation
- Valid URL format validation
- Only HTTP/HTTPS protocols allowed
Rejected:
javascript:
data:
file:

Error Handling
Implemented:
- Central error middleware
- Consistent API response format
- Custom API error handling
Example:
{
 "success":false,
 "message":"Invalid URL"
}

Security Implementation
Added:
Helmet
Purpose:
- Secure HTTP headers
CORS
Purpose:
- Allow frontend/backend communication securely
Rate Limiter
Purpose:
- Prevent API abuse
- Protect URL creation endpoint
Environment Configuration
Separate:
Backend:
.env

Frontend:
.env

No secrets are committed.
Postman Testing
Created Postman collection:
URL-Shortener.postman_collection.json

Collection includes:
- Create URL API
- Redirect testing
- Statistics API
Testing completed:
✅ URL creation
✅ MongoDB persistence
✅ Short URL generation
✅ Redirect flow
✅ API responses verified  
Saved successful responses are included.
Frontend Implementation
Frontend built using:
React + Vite

Features:
- URL input form
- API integration
- Generated short URL display
- Copy functionality
- Loading states
- Error handling
- Responsive UI
Frontend communicates with backend APIs without changing contracts.
AI Development Process
AI tools were used as development assistants.
Tools used:
- Claude
- ChatGPT
AI was used for:
- Requirement analysis
- Architecture planning
- Database design review
- Backend structure review
- Frontend implementation guidance
AI was NOT used as a replacement for engineering decisions.
All suggestions were reviewed, modified where required, and implemented based on project requirements.
AI_LOG.md Entries
Entry 1
Requirement analysis and understanding assignment scope.
Entry 2
Backend architecture planning.
Covered:
- Request flow
- Folder structure
- API design
- Edge cases
Entry 3
MongoDB schema review.
Covered:
- Data model validation
- Indexing
- Scalability considerations
Entry 4
Backend implementation architecture.
Covered:
- Model layer
- Service layer
- Controller separation
Entry 5
API testing and verification.
Covered:
- Postman collection
- Successful API testing
- Backend flow validation
Entry 6
Backend security improvements.
Covered:
- Rate limiter
- Helmet
- CORS
- Environment configuration
Entry 7
Frontend development.
Covered:
- React structure
- API integration
- UI implementation
Git Development History
Commits:
1.
Initialize URL shortener project structure

2.
Setup backend architecture and MongoDB connection

3.
Implement URL shortener core service architecture

4.
Add URL shortener API routes and endpoint mapping

5.
Add Postman collection and verify API functionality

6.
Add backend security middleware and production configurations

7.
Build URL shortener frontend interface

Submission Package
Repository contains:
URL-Shortener/

├── client/
├── server/
├── postman/
│   └── URL-Shortener.postman_collection.json
│
├── README.md
├── AI_LOG.md
└── .gitignore

Quick Setup
Backend
cd server

npm install

npm run dev

Frontend
cd client

npm install

npm run dev

Application:
Frontend:
http://localhost:5173


Backend:
http://localhost:5000

Final Submission Message
Hi Ankish,
Thank you for the opportunity.
I have completed the URL Shortener assignment and sharing the repository.
The submission includes:
- Complete frontend and backend source code
- README with setup instructions
- AI development log
- Postman collection with saved API requests and responses
The application has been tested end-to-end, including URL creation, redirection, and API functionality.
Looking forward to your feedback.
Regards,
Kunal Deshmukh

This is the full context snapshot of the project from **requirement → AI usage → architecture → implementation →