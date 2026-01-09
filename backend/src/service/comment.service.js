const { Comment } = require("../models");

const addComment = async (params) => {
  const { postId, userId, content } = params;

  const comment = await Comment.create({
    content,
    post: postId,
    author: userId,
  });
  return comment;
};

const getCommentsByPost = async (postId) => {
  const comment = await Comment.find({ post: postId })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  return comment;
};

const update = async (id, body) => {
  const comment = await Comment.findByIdAndUpdate(id, body);
  if (!comment) {
    throw new Error("No Comment found");
  }
  return comment;
};

module.exports = {
  addComment,
  getCommentsByPost,
  update
};
