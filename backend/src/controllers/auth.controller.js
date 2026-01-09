const { userService, tokenService } = require("../service");
const generateTokens = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = generateTokens(user);
    await tokenService.saveToken({
      userId: user._id,
      token: tokens.refreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await userService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const tokens = generateTokens(user);
    await tokenService.saveToken({
      userId: user._id,
      token: tokens.refreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        ...tokens,
      },
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await userService.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokens = generateTokens(user);
    await tokenService.saveToken({
      userId: user._id,
      token: tokens.refreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    res.json({
      success: true,
      data: tokens,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
