const express = require("express");
const router = express.Router({ mergeParams: true });
const { commentController } = require("../controllers");
const { commentValidation } = require("../validation");
const { auth, validate } = require("../middlewares");

router.post(
  "/:postId",
  auth,
  validate(commentValidation.createComment),
  commentController.createComment
);
router.get("/:postId", auth, commentController.getCommentsByPost);

router.put(
  "/edit/:id",
  auth,
  validate(commentValidation.createComment),
  commentController.updateComment
);

router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
