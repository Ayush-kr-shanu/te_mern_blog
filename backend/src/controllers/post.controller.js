const { postService } = require("../service");

const createPost = async (req, res, next) => {
  try {
    let data = {
      ...req.body,
      author: req.user.id
    }
    const post = await postService.create(data);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts(req.query);
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postService.postDetail(req.params.id)
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body)
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.sendStatus(404);

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.sendStatus(403);
    }

    await postService.updatePost(req.params.id, {
      deletedAt: new Date()
    })

    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
}
