const express = require("express")
const router = express.Router()
const { adminController } = require("../controllers")
const { auth, role } = require("../middlewares")

router.get(
  "/dashboard",
  auth,
  role("admin"),
  adminController.dashboardStats
)

router.get(
  "/posts",
  auth,
  role("admin"),
  adminController.getAllPosts
)

router.delete(
  "/posts/:id",
  auth,
  role("admin"),
  adminController.forceDeletePost
)

module.exports = router
