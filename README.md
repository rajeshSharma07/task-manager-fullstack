# Task Manager

A full-stack task management application built with React, Node.js, Express, and MongoDB. The application provides user authentication and allows authenticated users to create, view, update, and delete their own tasks.

## Live Demo

- Frontend: https://task-manager-frontend-d8fq.onrender.com
- Backend: https://task-manager-fullstack-chp1.onrender.com

## Overview

Task Manager is a full-stack web application designed to provide a simple and secure way for users to manage their tasks.

The application includes:

- User registration and login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected application routes
- User-specific task management
- Create, read, update, and delete operations for tasks
- Separate frontend and backend applications
- Production deployment using Render

Each authenticated user can access and manage only their own tasks.

## Features

### Authentication

- User registration
- User login
- User profile retrieval
- User logout
- Protected application routes
- JWT-based authentication
- HTTP-only authentication cookies
- Cross-origin authentication support for the deployed frontend and backend

### Task Management

Authenticated users can:

- View their tasks
- Create new tasks
- Update existing tasks
- Delete tasks

Tasks are associated with the authenticated user, so users only receive and manage their own tasks.

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Vite
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- CORS
- dotenv

### Deployment

- Render

## Project Structure

```text
task-manager-fullstack/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore

## Authentication Flow

The application uses JWT-based authentication with HTTP-only cookies.

1. A user registers an account.
2. The user logs in with their credentials.
3. The backend generates a JWT authentication token.
4. The token is stored in an HTTP-only cookie.
5. Protected requests include the authentication cookie.
6. The backend verifies the token before allowing access to protected resources.
7. Task operations are performed using the authenticated user's ID.

This ensures that authenticated users can access only the resources associated with their own account.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/profile` | Get the authenticated user's profile |
| POST | `/api/auth/logout` | Log out the authenticated user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/task/gettask` | Get tasks belonging to the authenticated user |
| POST | `/api/task/posttask` | Create a new task |
| PUT | `/api/task/updatetask/:id` | Update a task |
| DELETE | `/api/task/deletetask/:id` | Delete a task |

Protected task endpoints require user authentication.

## Local Development

### Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rajeshSharma07/task-manager-fullstack.git
cd task-manager-fullstack

## 2. Install Backend Dependencies

cd backend
npm install

## 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory.

Use safe placeholders such as:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

Do not commit the `.env` file to GitHub.

## 4. Start the Backend

For development:

npm run dev

The backend uses port `5000` by default when no `PORT` environment variable is provided.

## 5. Install Frontend Dependencies

Open a new terminal and run:

cd frontend
npm install

## 6. Configure Frontend Environment Variables

Create a `.env` file inside the `frontend` directory:

VITE_API_URL=http://localhost:5000

## 7. Start the Frontend

npm run dev

The frontend will run using the Vite development server.

## Environment Variables

### Backend

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `your_mongodb_connection_string` |
| `JWT_SECRET` | Secret used for JWT authentication | `your_jwt_secret` |
| `FRONTEND_URL` | Frontend origin allowed by CORS | `http://localhost:5173` |
| `PORT` | Port used by the backend server | `5000` |

### Frontend

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000` |

> **Security:** Never add real database credentials, passwords, JWT secrets, API keys, access tokens, or other sensitive information to the repository.

## Production Deployment

The application is deployed as separate frontend and backend services using Render.

### Backend Deployment

The backend service is configured with:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

The production backend requires the following environment variables:

MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=your_production_frontend_url

### Frontend Deployment

The frontend is deployed separately as a Vite application.

The frontend requires:

VITE_API_URL=your_production_backend_url

### SPA Routing

Because the frontend uses client-side routing, the Render frontend service uses the following rewrite configuration:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

This allows application routes such as `/login`, `/register`, and `/dashboard` to work correctly after deployment.

## Production URLs

### Frontend

https://task-manager-frontend-d8fq.onrender.com

### Backend

https://task-manager-fullstack-chp1.onrender.com

The backend root endpoint can be used to verify that the deployed server is running.

## Build

### Frontend Production Build

cd frontend
npm run build

### Backend Production Start

cd backend
npm start

## Security

The application follows several security practices:

- Passwords are hashed using `bcryptjs`.
- Authentication is handled using JWT.
- Authentication tokens are stored in HTTP-only cookies.
- Production authentication cookies are configured for secure cross-origin communication.
- Protected routes require authentication.
- Task queries are scoped to the authenticated user.
- Environment files are excluded from Git using `.gitignore`.

## Screenshots

Screenshots can be added to the repository inside a `screenshots` directory.

Recommended screenshots:

screenshots/
├── home.png
├── register.png
├── login.png
├── dashboard.png
└── tasks.png

Example Markdown:

![Home Page](./screenshots/home.png)

## Future Improvements

Potential improvements for future versions include:

- Task filtering and sorting
- Task search
- Task priority management
- Due dates
- Improved task status management
- Additional UI and user experience improvements
- Automated testing
- Continuous integration

## Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the changes locally.
5. Commit your changes.
6. Push the branch to your fork.
7. Open a pull request.

## License

No open-source license has been specified for this project yet.

If a license is added in the future, this section should be updated accordingly.

## Author

**Rajesh Sharma**

GitHub: https://github.com/rajeshSharma07
