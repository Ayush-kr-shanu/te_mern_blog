const userService = require("./user.service");
const postService = require("./post.service");
const commentService = require("./comment.service");
const adminService = require("./admin.service")
const tokenService = require("./token.service")

module.exports = {
  userService,
  postService,
  commentService,
  adminService,
  tokenService
};
