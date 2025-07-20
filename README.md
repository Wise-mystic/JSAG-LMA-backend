# Library Management API Backend

A simple Library Management System backend built with Node.js, Express.js, and MongoDB.

## Features

- **Admin Authentication**: JWT-based authentication for admin users
- **Book Management**: Full CRUD operations for books
- **Borrow Status**: Toggle book borrow/available status
- **Soft Delete**: Remove books with reason tracking
- **Security**: Password hashing with bcryptjs
- **CORS Support**: Configured for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: cors middleware

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── adminController.js   # Admin authentication logic
│   └── bookController.js    # Book CRUD operations
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── Admin.js            # Admin user model
│   └── Book.js             # Book model
├── routes/
│   ├── adminRoutes.js      # Admin routes
│   └── bookRoutes.js       # Book routes
├── server.js               # Main server file
├── setup.js                # Initial admin setup
├── .env                    # Environment variables
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `env.example` to `.env` and update the values:

```bash
cp env.example .env
```

Update the following variables in `.env`:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key for JWT
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Your frontend URL

### 3. Database Setup

Make sure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance.

### 4. Create Initial Admin

```bash
npm run setup
```

This creates an admin user with:
- Email: `admin@library.com`
- Password: `admin123`

### 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Admin Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/register` | Admin registration | No |
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/profile` | Get admin profile | Yes |

### Book Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/books` | Get all books | Yes |
| GET | `/api/books/:id` | Get single book | Yes |
| POST | `/api/books` | Add new book | Yes |
| PUT | `/api/books/:id` | Update book | Yes |
| PATCH | `/api/books/:id/toggle-borrow` | Toggle borrow status | Yes |
| PATCH | `/api/books/:id/remove` | Remove book (soft delete) | Yes |

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Admin Model

```javascript
{
  name: String (required, min 2 characters),
  email: String (required, unique, valid email format),
  password: String (required, min 6 characters, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## Book Model

```javascript
{
  title: String (required),
  author: String (required),
  genre: String (required),
  year: Number (required, 1000-current year),
  isBorrowed: Boolean (default: false),
  removed: Boolean (default: false),
  removalReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Example API Usage

### 1. Admin Registration

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "newadmin@library.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 2. Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@library.com",
    "password": "admin123"
  }'
```

### 3. Add a Book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "year": 1925
  }'
```

### 4. Toggle Book Borrow Status

```bash
curl -X PATCH http://localhost:5000/api/books/<book-id>/toggle-borrow \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 5. Remove a Book

```bash
curl -X PATCH http://localhost:5000/api/books/<book-id>/remove \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "reason": "Book damaged beyond repair"
  }'
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "success": false,
  "message": "Error description"
}
```

## Health Check

```bash
curl http://localhost:5000/health
```

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes with middleware
- Input validation
- Soft delete for data integrity
- CORS configuration for frontend integration

## Development

- Use `npm run dev` for development with auto-reload
- Check console logs for debugging
- MongoDB connection status is logged on startup
- All API responses include success status and appropriate messages 