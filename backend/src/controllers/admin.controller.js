const { adminService } = require("../service")

exports.dashboardStats = async (req, res, next) => {
  try {
    const [users, posts, comments] = await adminService.getDashboardStats()

    res.json({
      success: true,
      data: { users, posts, comments },
    })
  } catch (err) {
    next(err)
  }
}

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await adminService.getAllPosts()
    res.json({ success: true, data: posts })
  } catch (err) {
    next(err)
  }
}

exports.forceDeletePost = async (req, res, next) => {
  try {
    await adminService.forceDeletePost(req.params.id)
    res.json({ success: true, message: "Post permanently deleted" })
  } catch (err) {
    next(err)
  }
}
