const express = require("express")
const passport = require("passport")
const router = express.Router()
const { oauthController } = require("../controllers")

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  oauthController.oauthSuccess
)

router.get("/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
)

router.get("/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  oauthController.oauthSuccess
)

module.exports = router
