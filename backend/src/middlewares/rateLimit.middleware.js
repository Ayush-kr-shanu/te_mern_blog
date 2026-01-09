const rateLimit = require("express-rate-limit")

exports.authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per IP
  message: "Too many attempts. Please try again later.",
  skip: (req) => req.method === "OPTIONS", // Skip rate limiting for preflight requests
})
