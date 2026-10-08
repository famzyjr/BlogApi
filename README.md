# IBlog API

IBlog API is a RESTful backend API built with **Node.js, Express.js, MongoDB, and Mongoose**. It provides CRUD operations for creating, reading, updating, and deleting blog posts.

The API is designed to work with a frontend application such as React.

## 🚀 Live API

`https://blogapi-5lsj.onrender.com`

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* CORS
* Thunder Client
* Render

## 📁 Project Structure

```text
My_blog_api/
│
├── models/
│   └── Blog.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/famzyjr/BlogApi.git
```

Navigate into the project:

```bash
cd BlogApi
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm start
```

The server will run locally on:

```text
http://localhost:5000
```

## 🔐 Environment Variables

The application uses environment variables to protect sensitive configuration.

```env
MONGO_URI=your_mongodb_connection_string
```

**Never commit your `.env` file to GitHub.**

Make sure `.gitignore` contains:

```text
node_modules
.env
```

## 📦 Blog Model

Each blog contains:

| Field     | Type   | Required                |
| --------- | ------ | ----------------------- |
| title     | String | Yes                     |
| author    | String | Yes                     |
| content   | String | Yes                     |
| createdAt | Date   | Automatically generated |
| updatedAt | Date   | Automatically generated |

Example:

```json
{
  "title": "My First Blog",
  "author": "Ahmed",
  "content": "I am learning backend development."
}
```

## 🔗 API Endpoints

### Get All Blogs

```http
GET /api/blogs
```

Example:

```text
https://blogapi-5lsj.onrender.com/api/blogs
```

Returns all blogs stored in the database.

### Get One Blog

```http
GET /api/blogs/:id
```

Example:

```text
https://blogapi-5lsj.onrender.com/api/blogs/6ac6bc16ca75b3540ac33d25
```

Returns a single blog using its MongoDB ID.

### Create a Blog

```http
POST /api/blogs
```

Request body:

```json
{
  "title": "My First Blog",
  "author": "Ahmed",
  "content": "This is my first blog post."
}
```

Successful response:

```json
{
  "title": "My First Blog",
  "author": "Ahmed",
  "content": "This is my first blog post.",
  "_id": "blog_id",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update a Blog

```http
PUT /api/blogs/:id
```

Request body:

```json
{
  "title": "Updated Blog Title",
  "author": "Ahmed",
  "content": "Updated blog content."
}
```

The API validates the blog ID before attempting the update.

### Delete a Blog

```http
DELETE /api/blogs/:id
```

Example:

```text
https://blogapi-5lsj.onrender.com/api/blogs/blog_id
```

Deletes the blog with the specified ID.

## ✅ Validation

The API checks that required fields are provided when creating or updating a blog.

Required fields:

```text
title
author
content
```

If a required field is missing, the API returns:

```json
{
  "message": "Title, author and content are required"
}
```

The API also validates MongoDB ObjectIds.

For example:

```text
/api/blogs/123
```

returns:

```json
{
  "message": "Invalid blog ID"
}
```

## ❌ Error Handling

The API uses centralized error handling for unexpected server errors.

Common status codes include:

| Status | Meaning            |
| ------ | ------------------ |
| 200    | Request successful |
| 201    | Resource created   |
| 400    | Invalid request    |
| 404    | Resource not found |
| 500    | Server error       |

Example:

```json
{
  "message": "Blog not found"
}
```

## 🌐 CORS

CORS is enabled so that frontend applications can communicate with the API.

```js
app.use(cors());
```

This allows applications such as a React/Vite frontend to make requests to the API from a different origin.

## 🧪 Testing

The API was tested using **Thunder Client**.

The following operations were tested:

* GET all blogs
* GET a single blog
* POST a new blog
* PUT/update a blog
* DELETE a blog
* Invalid blog IDs
* Missing required fields
* Server error handling

## 🚀 Deployment

The API is deployed using **Render**.

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

The application uses Render's dynamically assigned port:

```js
const PORT = process.env.PORT || 5000;
```

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Authorization
* Blog categories
* Search functionality
* Pagination
* Comments
* Likes
* Image uploads
* Improved validation
* Rate limiting

## 📚 What I Learned

While building this project, I practiced:

* Creating REST APIs with Express
* Connecting Node.js to MongoDB
* Using Mongoose models
* CRUD operations
* Async/await
* API validation
* MongoDB ObjectId validation
* HTTP status codes
* Error handling middleware
* CORS
* Environment variables
* API testing with Thunder Client
* Deploying a backend API with Render

## 👨🏽‍💻 Author

**Ahmed Famuyiwa**

Frontend Developer | JavaScript | React | Node.js

GitHub: `https://github.com/famzyjr`
