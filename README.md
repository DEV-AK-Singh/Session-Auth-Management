# Session Authentication Management

## Project Overview

This project is a simple session-based authentication system that provides login, registration, and logout functionality using **Express**, **EJS**, **MongoDB**, and **cookie-parser**. The system manages user sessions using cookies and stores user credentials securely in MongoDB with **bcrypt** for password hashing.

## Features

1. **User Registration**:
   - Allows new users to register by creating a username and password.
   - Passwords are securely hashed using **bcrypt** before storage.

2. **User Login**:

   - Registered users can log in with their credentials.
   - On successful login, a session is created and stored in cookies using **cookie-parser**.

3. **User Logout**:

   - Users can log out, which clears the session cookie and ends their authenticated session.

4. **Session Management**:
   - Uses **uuid** to generate unique session IDs, stored as cookies for session tracking.
   - Sessions are stateless (do not persist between server restarts).

## Previews

![alt text](previews/preview1.png)
![alt text](previews/preview2.png)
![alt text](previews/preview3.png)
![alt text](previews/preview4.png)

## Tech Stack

- **Node.js** & **Express**: For building the server and handling routing.
- **EJS**: For server-side rendering and templating.
- **MongoDB**: For storing user credentials.
- **Mongoose**: For interacting with the MongoDB database.
- **bcrypt**: For hashing user passwords before storing them.
- **cookie-parser**: For managing cookies in the session.
- **uuid**: For generating unique session identifiers.
- **TailwindCSS**: For styling (optional).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/session-auth-management.git
   cd session-auth-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file for your MongoDB connection string:

   ```bash
   MONGO_URI=mongodb://localhost:27017/session-auth-system
   SESSION_SECRET=your_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Endpoints

- **GET /auth/login**: Displays the login form.
- **POST /auth/login**: Handles user login.
- **GET /auth/register**: Displays the registration form.
- **POST /auth/register**: Handles user registration.
- **GET /auth/logout**: Logs out the user and ends their session.

## Project Structure

```folder
├── controllers
│   └── authController.js     # Handles login, registration, logout logic
├── models
│   └── userModel.js          # Mongoose schema and model for users
├── routes
│   └── authRoutes.js         # Routes for authentication (login, register, logout)
├── views
│   ├── layouts
│   │   └── main.ejs          # Layout for all EJS pages
│   ├── pages
│   │   ├── home.ejs          # Home page
│   │   ├── login.ejs         # Login page
│   │   └── register.ejs      # Register page
├── .env                      # Environment variables (e.g., MongoDB URI, session secret)
├── app.js                    # Main Express application file
└── package.json              # Project metadata and dependencies
```

## Dependencies

- **bcrypt**: `^5.1.1`
- **cookie-parser**: `^1.4.6`
- **ejs**: `^3.1.10`
- **express**: `^4.21.0`
- **express-ejs-layouts**: `^2.5.1`
- **mongoose**: `^8.7.0`
- **uuid**: `^10.0.0`

## Usage

1. **Register** a new user by visiting `/auth/register`.
2. **Login** using the credentials created during registration at `/auth/login`.
3. Once logged in, the session is stored in cookies. You can navigate to protected routes.
4. **Logout** by visiting `/auth/logout`.

## License

This project is licensed under the MIT License.
