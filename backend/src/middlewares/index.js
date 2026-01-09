const auth = require("./auth.middleware");
const error = require("./error.middleware");
const role = require("./role.middleware");
const rateLimit = require("./rateLimit.middleware");
const activity = require("./activity.middleware");
const validate = require("./validate.middleware")

module.exports = {
  auth: auth.authenticate,
  error: error.errorHandler,
  role: role.authorizeRoles,
  rateLimit: rateLimit.authRateLimiter,
  activity: activity.logActivity,
  validate
};
