const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const { auth, activity, validate } = require("../middlewares");
const { postValidation } = require("../validation");

router.post(
  "/",
  auth,
  activity("CREATE_POST"),
  validate(postValidation.createPost),
  postController.createPost
);

router.get("/", validate(postValidation.getPost), postController.getPosts);

router.get(
  "/:id",
  validate(postValidation.getPostDetail),
  postController.getPostById
);

router.put(
  "/:id",
  activity("UPDATE_POST"),
  auth,
  validate(postValidation.updatePost),
  postController.updatePost
);

router.delete(
  "/:id",
  auth,
  activity("DELETE_POST"),
  validate(postValidation.deletePost),
  postController.deletePost
);

module.exports = router;
