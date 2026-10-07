const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5000;

// Temporary blog data
const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Ahmed",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    title: "Understanding JavaScript",
    author: "John",
    content: "JavaScript is one of the most popular programming languages.",
  },
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
      message: "Blog not found",
    });
  }

  res.json(blog);
});

app.post("/api/blogs", (req, res) => {
  const { title, author, content } = req.body;

  const newBlog = {
    id: blogs.length + 1,
    title,
    author,
    content,
  };

  blogs.push(newBlog);

  res.status(201).json(newBlog);
});

app.put("/api/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  const { title, author, content } = req.body;

  blog.title = title;
  blog.author = author;
  blog.content = content;

  res.json(blog);
});

app.delete("/api/blogs/:id", (req, res) => {
  const id = Number(req.params.id);

  const blogIndex = blogs.findIndex((blog) => blog.id === id);

  if (blogIndex === -1) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  const deletedBlog = blogs.splice(blogIndex, 1);

  res.json({
    message: "Blog deleted successfully",
    blog: deletedBlog[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
