const authController = require("./auth.controller");
const userController = require("./user.controller");
const oauthController = require("./oauth.controller");
const postController = require("./post.controller");
const commentController = require("./comment.controller");
const adminController = require("./admin.controller");

module.exports = {
  authController,
  userController,
  oauthController,
  postController,
  commentController,
  adminController,
};
