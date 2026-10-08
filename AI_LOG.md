# AI Usage Log

# Notice : Use of AI for structured AI_LOGS to refine context save time and better understanding. I have used ai to save time in typing, typos due to time constraint. I have provided the raw context hand typed and polished it via ai to look structured and detailed by explaining each part. Also, I have maintained it live while project development as it can reflect with every commit history.

This document tracks how AI tools were used during the development process.
AI was used as a development assistant for planning, reviewing, debugging, and improving implementation decisions.

---

## Entry 1

### Tool Used
Claude

### Purpose
Backend architecture planning and engineering review before implementation.

### Prompt Given

I am building a URL Shortener application for a Full Stack Developer take-home assignment.

Current stack:
- React with Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Modern ES Module syntax (import/export)

Current backend setup:
- Server project initialized
- app.js created as application/routes entry point
- index.js created as application startup file
- dotenv configuration completed
- MongoDB Atlas connection working
- Database name: url_shortner

Project requirements:
1. Submit a long URL
2. Generate a unique short URL
3. Persist URL mapping in MongoDB
4. Redirect users from short URL to original URL

Before writing code:
- Explain backend request flow
- Suggest clean folder structure
- Explain database model design
- Define API contracts
- Mention important edge cases

Do not generate the complete application.
Provide the engineering plan first.

### AI Response Summary

Claude provided a backend engineering plan covering:

- Request flow for creating short URLs and redirect handling
- MVC-style backend folder structure with separation between routes, controllers, services, models, middleware and utilities
- MongoDB schema design with fields like originalUrl, shortCode, clicks and timestamps
- REST API contracts for URL creation and redirection
- Important edge cases including URL validation, duplicate short codes, invalid redirects, security considerations and error handling

Claude also suggested production-level improvements such as collision handling, rate limiting, environment validation and service-layer separation.

### My Decision

Reviewed the suggested architecture and selected the parts suitable for the assignment scope.

Implemented decisions:
- Keep layered backend structure with routes, controllers, services and models
- Use MongoDB unique indexing for shortCode safety
- Keep API responses consistent
- Handle URL validation and redirect errors

Skipped unnecessary complexity for the current scope:
- URL deduplication
- Advanced analytics
- Custom distributed ID generation
- Additional infrastructure features

The goal is to deliver a clean, maintainable and working solution within the assignment timeline.


## Entry 2

### Tool Used
Claude

### Purpose
Checking the final data models with the essential parameter and whats can be added or improved finalizing the whole data model with mongoose

### Prompt Given
Act as a senior backend engineer reviewing my MongoDB data model.

urls:
- originalUrl
- shortCode
- clicks
- createdAt
- updatedAt

Review:
- missing fields
- validation rules
- indexing requirements
- scalability concerns

Do not generate code. Only review the database design.

### AI Response Summary

Claude reviewed the proposed URL schema and confirmed that it satisfies the core assignment requirements.

Suggested improvements:
- Add validation for original URLs using URL parsing instead of regex.
- Keep shortCode unique and protected using MongoDB indexing.
- Keep shortCode case-sensitive.
- Use atomic increment operations for click tracking.
- Avoid storing click events inside the URL document because it can create document growth issues.

Claude also suggested optional production features such as:
- lastAccessedAt tracking
- URL expiration using TTL indexes
- Redis caching
- separate click analytics collection

### My Decision

Selected the following schema for the assignment:

Collection:
`urls`

Fields:
- originalUrl
- shortCode
- clicks
- createdAt
- updatedAt

Implementation decisions:
- Use unique indexing on shortCode for collision protection.
- Validate URLs using http/https protocol checks.
- Keep click tracking simple using atomic increment.
- Avoid optional production features like expiry, analytics collections and caching due to assignment scope and timeline.


## Entry 3

### Tool Used
Claude

### Purpose
Implementation architecture and backend layer design.

### Prompt Given

Act as a senior Node.js backend engineer.

Based on the approved architecture and database design, help me implement the backend layers for the URL Shortener application.

Current architecture:
// AI structured 
src/
├── config/
├── models/
├── controllers/
├── services/
├── routes/
├── utils/

Requirements:
- Create short URLs from original URLs
- Store URL mappings in MongoDB
- Redirect using short codes
- Maintain clean separation between controllers and services

Help design:
1. Mongoose model implementation
2. Service layer responsibilities
3. Controller responsibilities
4. API response structure
5. Utility requirements

Do not create a monolithic implementation.
Keep each layer responsible for one purpose.

### AI Response Summary

Claude suggested maintaining a layered architecture:

Controller:
- Handle HTTP request and response
- Validate incoming request data
- Call service functions
- Return API responses

Service:
- Handle URL creation logic
- Generate unique short codes
- Interact with database models
- Resolve short URLs during redirects

Model:
- Maintain URL schema and database constraints

Utility:
- Generate short codes
- Manage reusable helpers like base URL generation

### My Decision

Implemented the layered approach:

- `url.model.js` manages MongoDB schema
- `url.service.js` contains URL business logic
- `url.controller.js` handles API communication
- Utility functions are separated for reusable operations

Kept the implementation simple according to assignment requirements while maintaining production-style separation.



## Entry 4

### Tool Used
Claude

### Purpose
Connecting backend layers through Express routes.

### Prompt Given

Based on the completed URL shortener backend layers:

- MongoDB model completed
- Service layer completed
- Controller layer completed

Help design the Express route layer.

Requirements:
- Keep routes responsible only for endpoint mapping
- Connect HTTP methods with controllers
- Follow REST API conventions
- Avoid moving business logic into routes

### AI Response Summary

Claude suggested exposing:
- POST endpoint for creating short URLs
- GET endpoint for redirect handling
- GET endpoint for URL statistics

It recommended keeping route files lightweight and maintaining separation between routing, controllers and services.

### My Decision

Implemented route-based API mapping while keeping all business logic inside the service layer.

## Entry 5

### Tool Used
Claude

### Purpose
Adding validation and centralized error handling.

### Prompt Given

Review the current URL shortener backend flow and suggest validation and error handling improvements.

Requirements:
- Keep controllers clean
- Avoid duplicate try/catch responses
- Handle invalid URLs and missing input
- Maintain consistent API error responses

### AI Response Summary

Claude suggested:
- Request validation before controller execution
- Centralized error handling middleware
- Custom error class for consistent responses
- Handling invalid protocols and malformed URLs

### My Decision

Implemented validation middleware and centralized error handling.

Handled:
- Missing URL input
- Invalid URL format
- Unsupported protocols
- Missing short codes
- Database failures

Kept the implementation lightweight according to assignment scope.


## Entry 6

### Tool Used
claude + Postman

### Purpose
API testing and backend flow verification.

### Prompt Given

Help mwe write the test scripts with postman collection to test and first validation of the server including all the
routes url routes, redirect routes, error handling and validation as well 

### Testing Process

Exported the Postman collection for the URL Shortener API and imported it for testing.

Verified the complete backend flow:

- API server is running successfully
- MongoDB Atlas connection is working
- URL creation endpoint is generating short URLs
- Generated short URL is stored correctly in MongoDB
- Redirect endpoint successfully resolves short codes
- API responses are returned in the expected format

### Tested Endpoints

#### Create Short URL

POST `/api/urls`

Tested with:

```json
{
  "originalUrl": "https://example.com/some/long/path?x=1"

}


## Entry 7

### Purpose
Backend security improvements and production readiness enhancements.

### Changes Implemented

Before moving to frontend integration, additional backend improvements were added to make the application more production-ready.

Implemented:

- Added rate limiting to protect API endpoints from excessive requests.
- Updated environment configurations for both client and server.
- Configured CORS to allow secure communication between frontend and backend.
- Added Helmet middleware for setting secure HTTP headers.
- Reviewed backend configuration and deployment-related environment variables.

### Implementation Decisions

- Rate limiting was added to prevent API abuse, especially on URL creation endpoints.
- CORS was configured based on the frontend-backend communication requirement.
- Helmet was added as a security middleware following Express.js best practices.
- Environment variables were kept separate for client and server to avoid exposing sensitive configurations.

### Result

The backend now includes basic production-level security practices while maintaining the existing API functionality.

Verified that:
- API endpoints continue to work correctly.
- Frontend communication is configured properly.
- Security middleware does not break existing functionality.




## Entry 8

### Tool Used
Claude

### Purpose
Frontend development and client-side integration.

### Prompt Given

Act as a senior React.js frontend engineer.

I have completed the backend of a URL Shortener application.

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- REST APIs completed and tested using Postman

Frontend Stack:
- React.js
- Vite
- Modern JavaScript (ES6+)

I provided:
- Backend API routes
- Request parameters
- Response formats
- Frontend requirements

Help build the client application with:
- Clean component structure
- API integration
- URL shortening flow
- Loading and error states
- Responsive and polished UI
- Proper handling of backend responses

Do not change backend APIs. Build the frontend according to the existing API contracts.

### AI Response Summary

Claude helped structure the React client application with:

- Component-based architecture
- API service integration
- URL submission workflow
- Short URL result display
- Copy-to-clipboard functionality
- Loading and error handling
- Responsive user interface

### My Decision

Reviewed and integrated the frontend implementation according to the existing backend API design.

Verified:
- Client successfully communicates with backend APIs
- URL shortening flow works end-to-end
- Generated short URLs are displayed correctly
- UI interactions and error handling work properly

The frontend and backend are now integrated into a complete working application.
