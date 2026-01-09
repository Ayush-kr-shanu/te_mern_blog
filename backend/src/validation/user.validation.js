const Joi = require("joi");

const updateUser = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

module.exports = {
    updateUser
}