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

app.get("/api/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  res.json(blog);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});