const { commentService } = require("../service");

const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const comment = await commentService.addComment({
      postId,
      userId: req.user.id,
      content,
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postId);
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.update(id, {
      cotent: req.body.content,
    });

    res.json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    await commentService.update(req.id, {
      deletedAd: new Date(),
    });
    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
}