const express = require("express");
const { Post } = require("../models/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({
      $and: [{ userID: req.body.userID }, req.query],
    });
    res.send(posts);
  } catch (error) {
    res.send({ message: error.message || "error occurred" });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const newPost = Post({ ...req.body, userID: req.body.userID });
    await newPost.save();
    res.send({ message: "Post successfully created" });
  } catch (error) {
    res.send({ message: error.message || "error occurred" });
  }
});

postRouter.get("/top", (req, res) => {});

postRouter.patch("/update/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Post successfully deleted" });
  } catch (error) {
    res.send({ message: error.message || "error occurred" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.send({ message: "Post successfully deleted" });
  } catch (error) {
    res.send({ message: error.message || "error occurred" });
  }
});

module.exports = { postRouter };
