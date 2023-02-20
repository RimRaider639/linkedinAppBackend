const mg = require("mongoose");

const postSchema = mg.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: { type: String, required: true },
  no_of_comments: { type: Number, required: true },
  userID: { type: String, required: true },
});

const Post = mg.model("linkedInPost", postSchema);

module.exports = { Post };
