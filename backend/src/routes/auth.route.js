const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { rateLimit, validate } = require("../middlewares");
const { authValidation } = require("../validation");

router.post(
  "/register",
  // rateLimit,
  validate(authValidation.register),
  authController.register
);
router.post(
  "/login",
  // rateLimit,
  validate(authValidation.login),
  authController.login
);
router.post(
  "/refresh",
  validate(authValidation.refreshToken),
  authController.refreshToken
);

module.exports = router;
