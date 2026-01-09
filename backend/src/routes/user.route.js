const express = require("express")
const router = express.Router()
const { userController } = require("../controllers")
const { auth, role } = require("../middlewares")

router.get("/me", auth, userController.getProfile)

router.get("/", auth, role("admin"), userController.getAllUsers)

router.patch(
  "/:id/role",
  auth,
  role("admin"),
  userController.updateUserRole
)

module.exports = router
