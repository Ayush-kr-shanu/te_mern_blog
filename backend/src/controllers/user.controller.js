const { userService } = require("../service");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id)
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
}

const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      {role: req.body.role}
    )
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

const deactivateUser = async (req, res, next) => {
  try {
    await userService.updateUser(req.params.id, { isActive: false })
    res.json({ success: true, message: "User deactivated" })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProfile,
  getAllUsers,
  updateUserRole,
  deactivateUser
}