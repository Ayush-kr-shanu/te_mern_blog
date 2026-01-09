exports.logActivity = (action) => {
  return (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] User:${
        req.user?.id || "Guest"
      } Action:${action}`
    )
    next()
  }
}
