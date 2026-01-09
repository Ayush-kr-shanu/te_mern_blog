const { Post } = require("../models");

const create = async (postData) => {
  console.log(postData)
  const post = await Post.create(postData);
  return post;
};

const getAllPosts = async (params) => {
  const { pageSize, pageNumber } = params;
  const posts = await Post.find({
    deletedAt: null,
  })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(pageNumber)
    .limit(pageSize);
  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};

const postDetail = async (id) => {
  const post = await Post.findOne({
    _id: id,
    deletedAt: null,
  })
    .populate({
      path: "author",
      select: "name email",
    })
    .populate({
      path: "comments",
      match: { deletedAt: null },
      populate: {
        path: "author",
        select: "name email",
      },
      options: { sort: { createdAt: -1 } },
    });

  if (!post) {
    const err = new Error("Post not found");
    err.status = 404;
    throw err;
  }
  return post;
};

const updatePost = async (id, body) => {
    const post = await Post.findByIdAndUpdate(id, body)
    return post
}

module.exports = {
    create,
    getAllPosts,
    getPostById,
    postDetail,
    updatePost
}
