const { Token } = require("../models");

const saveToken = async (tokenData) => {
  console.log(tokenData,"==>>>>>>")
  const token = await Token.create(tokenData);
  return token
};

module.exports = {
  saveToken,
};
