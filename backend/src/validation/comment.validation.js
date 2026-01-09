const Joi = require("joi");

const createComment = {
  params: Joi.object({
    postId: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
  }),
};

const updateComment = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().min(1).max(1000).required(),
  }),
};

module.exports = {
  createComment,
  updateComment
}
