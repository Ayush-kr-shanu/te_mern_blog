const { User } = require("../models");

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const err = new Error("User already exists with this email");
    err.status = 409;
    throw err;
  }

  const user = await User.create(userData);
  return user;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getAllUsers = async () => {
  const user = await User.find();
  return user;
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const validateUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  return user;
};

const updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body);
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  validateUser,
  getUserById,
  updateUser
};
