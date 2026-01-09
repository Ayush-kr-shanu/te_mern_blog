const { User, Post, Comment } = require("../models");

const getDashboardStats = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments({ deletedAt: null }),
      Comment.countDocuments({ deletedAt: null }),
    ]);

    return { users, posts, comments };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllPosts = async () => {
  try {
    return await Post.find({ deletedAt: null })
      .populate("author", "name email")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(error.message);
  }
};

const forceDeletePost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("Post not found");
      err.status = 404;
      throw err;
    }

    await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ post: postId });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getDashboardStats,
  getAllPosts,
  forceDeletePost,
};
