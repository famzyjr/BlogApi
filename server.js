const express = require("express");

const app = express();

const PORT = 5000;

// Temporary blog data
const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Ahmed",
    content: "React is a JavaScript library for building user interfaces."
  },
  {
    id: 2,
    title: "Understanding JavaScript",
    author: "John",
    content: "JavaScript is one of the most popular programming languages."
  }
];

// Get all blogs
app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});