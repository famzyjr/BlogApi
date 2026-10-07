const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const Blog = require("./models/Blog");

const app = express();

app.use(express.json());

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
  });

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const newBlog = await Blog.create({
      title,
      author,
      content,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message,
    });
  }
});

app.put("/api/blogs/:id", async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog",
      error: error.message,
    });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
