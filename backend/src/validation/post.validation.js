const Joi = require("joi");

const createPost = {
  body: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().max(500).optional(),
    status: Joi.string().valid("draft", "published").optional(),
  }),
};

const updatePost = {
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().max(500).optional(),
    status: Joi.string().valid("draft", "published").optional(),
  }),
};

const getPost = {
  query: {
    pageSize: Joi.number().integer().min(1).max(100).default(100),
    pageNumber: Joi.number().integer().min(1).default(1),
  }
}

const getPostDetail = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

const deletePost = {
  params: Joi.object({
    id: Joi.string().required()
  }),
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  getPostDetail,
  deletePost
}