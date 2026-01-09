const rateLimit = require("express-rate-limit");

if (process.env.NODE_ENV === "test") {
  module.exports = (req, res, next) => next();
} else {
  exports.authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many attempts. Please try again later.",
    skip: (req) => req.method === "OPTIONS",
  });
}
