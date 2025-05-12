const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create a new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { header, description } = req.body;
    const post = new Post({
      header,
      description,
      image: req.file.path,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      header: req.body.header,
      description: req.body.description,
    };
    if (req.file) {
      updatedData.image = req.file.path; // Update the image if a new one is provided
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      header: req.body.header,
      description: req.body.description,
    };
    if (req.file) {
      updatedData.image = req.file.path;
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("Post deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;