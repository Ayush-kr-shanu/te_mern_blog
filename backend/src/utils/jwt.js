const jwt = require("jsonwebtoken")
const { Token } = require("../models")

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  )
  return { accessToken, refreshToken }
}

module.exports = generateTokens