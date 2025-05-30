# Kahit Saan - MERN Stack Application

## Description

Kahit Saan is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It features a customer-facing frontend for browsing a menu and an admin panel for managing menu items and users. The application is designed to be deployed on platforms like Render.com.

## Features

### Frontend (Client-Side)
*   Browse and view menu items.
*   Responsive design for various screen sizes.
*   (Add other public-facing features here)

### Admin Panel
*   Secure login for administrators.
*   **Menu Management:** Create, Read, Update, and Delete (CRUD) menu items, including image uploads.
*   **User Management:** CRUD operations for admin and staff users.
*   (Add other admin features here)

## Tech Stack

### Frontend (Kahit-Saan directory)
*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Next-generation frontend tooling for fast development.
*   **Material-UI (MUI):** React UI framework for styled components.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **React Router:** For client-side routing.
*   **Lucide Icons:** Icon library.
*   **Context API:** For state management (e.g., authentication).

### Backend (Server directory)
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database for storing application data.
*   **Mongoose:** ODM library for MongoDB and Node.js.
*   **JSON Web Tokens (JWT):** For securing API endpoints and managing user authentication.
*   **Bcrypt.js:** For hashing passwords.
*   **CORS:** For enabling Cross-Origin Resource Sharing.
*   **Multer & Cloudinary:** For handling file uploads (e.g., menu item images).
*   **Dotenv:** For managing environment variables.

## Getting Started

### Prerequisites
*   Node.js (v18.x or later recommended)
*   npm (usually comes with Node.js)
*   MongoDB (local instance or a cloud-hosted solution like MongoDB Atlas)
*   Git

### Installation

1.  **Clone the repository (if applicable, otherwise skip):**
    ```bash
    git clone <your-repository-url>
    cd IPT2-FINAL
    ```

2.  **Setup Backend (Server):**
    *   Navigate to the Server directory:
        ```bash
        cd Server
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `Server` directory and add the following environment variables (see "Environment Variables" section below for details):
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        PORT=5000
        # Add Cloudinary variables if you've set it up
        # CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        # CLOUDINARY_API_KEY=your_cloudinary_api_key
        # CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```

3.  **Setup Frontend (Kahit-Saan):**
    *   Navigate to the frontend directory:
        ```bash
        cd ../Kahit-Saan 
        # (or cd Kahit-Saan from the root)
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `Kahit-Saan` directory (root of the frontend project) and add the following environment variable:
        ```env
        VITE_API_BASE_URL=http://localhost:5000 
        # For local development, this points to your local backend.
        # For production, this will be your deployed backend URL.
        ```

### Running Locally

1.  **Start the Backend Server:**
    *   In the `Server` directory:
        ```bash
        npm start
        ```
    *   The server should typically run on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    *   In the `Kahit-Saan` directory:
        ```bash
        npm run dev
        ```
    *   The frontend application will usually be accessible at `http://localhost:5173` (or another port specified by Vite).

## Environment Variables

### Backend (`Server/.env`)
*   `MONGO_URI`: **Required.** Your MongoDB connection string.
    *   Example: `mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority`
*   `JWT_SECRET`: **Required.** A strong, unique secret key for signing JSON Web Tokens.
*   `PORT`: Optional. The port the backend server will run on. Defaults to `5000`.
*   `CLOUDINARY_CLOUD_NAME`: Optional (Required if using Cloudinary for image uploads). Your Cloudinary cloud name.
*   `CLOUDINARY_API_KEY`: Optional (Required if using Cloudinary). Your Cloudinary API key.
*   `CLOUDINARY_API_SECRET`: Optional (Required if using Cloudinary). Your Cloudinary API secret.

### Frontend (`Kahit-Saan/.env`)
*   `VITE_API_BASE_URL`: **Required.** The base URL for your backend API.
    *   For local development: `http://localhost:5000`
    *   For production: `https://your-deployed-backend-url.onrender.com`

## Deployment

This application is configured for deployment on Render.com (or similar platforms).

### Backend (Node.js Web Service on Render)
*   **Build Command:** `npm install` (or `yarn install`)
*   **Start Command:** `npm start` (or `yarn start`)
*   **Environment Variables:** Set `MONGO_URI`, `JWT_SECRET`, and Cloudinary variables (if used) in the Render dashboard.

### Frontend (Static Site on Render)
*   **Build Command:** `npm run build` (or `yarn build`)
*   **Publish Directory:** `dist`
*   **Environment Variables:** Set `VITE_API_BASE_URL` to your deployed backend service URL in the Render dashboard.

**Deployed URLs (Example):**
*   Frontend: `https://kahit-saan-client.onrender.com`
*   Backend: `https://kahit-saan-server.onrender.com`

## API Endpoints Overview

The backend exposes RESTful APIs for various functionalities.

### Authentication (`/api/auth`)
*   `POST /register`: Register a new admin/staff user.
*   `POST /login`: Log in an existing admin/staff user.

### Menu Items (`/api/menu`)
*   `GET /`: Get all menu items.
*   `POST /`: Add a new menu item (requires admin token, multipart/form-data).
*   `PUT /:id`: Update an existing menu item (requires admin token, multipart/form-data).
*   `DELETE /:id`: Delete a menu item (requires admin token).

### Users (`/api/users`)
*   `GET /`: Get all users (requires admin token).
*   `POST /`: Create a new user (requires admin token).
*   `PUT /:id`: Update a user (requires admin token).
*   `DELETE /:id`: Delete a user (requires admin token).

## Folder Structure

```
IPT2-FINAL/
├── Kahit-Saan/        # Frontend React/Vite application
│   ├── public/        # Static assets
│   ├── src/           # Source files (components, pages, context, etc.)
│   ├── .env           # Frontend environment variables (local)
│   ├── package.json
│   └── vite.config.js
│
├── Server/            # Backend Node.js/Express application
│   ├── config/        # Database, Cloudinary config
│   ├── controllers/   # Request handlers, business logic
│   ├── middleware/    # Custom middleware (auth, file uploads)
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   ├── .env           # Backend environment variables (local)
│   └── index.js       # Main server entry point
│   └── package.json
│
└── README.md          # This file
```

## Contributing

(Details on how to contribute if this were an open-source project)

---

*This README was generated on May 30, 2025.*
