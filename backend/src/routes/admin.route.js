const express = require("express")
const router = express.Router()
const { adminController } = require("../controllers")
const { auth, role, activity } = require("../middlewares")

router.get(
  "/dashboard",
  activity("ADMIN_GET_DASHBOARD"),
  auth,
  role("admin"),
  adminController.dashboardStats
)

router.get(
  "/posts",
  activity("ADMIN_GET_POSTS"),
  auth,
  role("admin"),
  adminController.getAllPosts
)

router.delete(
  "/posts/:id",
  activity("ADMIN_DELETE_POST"),
  auth,
  role("admin"),
  adminController.forceDeletePost
)

module.exports = router
