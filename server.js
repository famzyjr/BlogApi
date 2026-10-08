const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Blog = require("./models/Blog");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;



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


app.get("/api/blogs", async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});



app.get("/api/blogs/:id", async (req, res, next) => {
  try {
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
});



app.post("/api/blogs", async (req, res, next) => {
  try {
    const { title, author, content } = req.body;

    // Validate required fields
    if (!title || !author || !content) {
      return res.status(400).json({
        message: "Title, author and content are required",
      });
    }

    const newBlog = await Blog.create({
      title,
      author,
      content,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});



app.put("/api/blogs/:id", async (req, res, next) => {
  try {
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const { title, author, content } = req.body;

    // Validate required fields
    if (!title || !author || !content) {
      return res.status(400).json({
        message: "Title, author and content are required",
      });
    }

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
    next(error);
  }
});



app.delete("/api/blogs/:id", async (req, res, next) => {
  try {
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

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
    next(error);
  }
});



app.get("/api/test-error", (req, res, next) => {
  try {
    throw new Error("This is a test error");
  } catch (error) {
    next(error);
  }
});



app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});