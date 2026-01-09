const express = require("express")
const router = express.Router()

const authRoute = require("./auth.route")
const userRoute = require("./user.route")
const oauthRoute = require("./oauth.route")
const postRoute = require("./post.route")
const commentRoute = require("./comment.route")
const adminRoute = require("./admin.route")

router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/oauth", oauthRoute)
router.use("/post", postRoute)
router.use("/comment", commentRoute)
router.use("/admin", adminRoute)

module.exports = router