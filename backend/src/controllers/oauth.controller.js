const jwt = require("jsonwebtoken")

exports.oauthSuccess = async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // 🔥 Redirect back to frontend
    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    )
  } catch (err) {
    next(err)
  }
}
