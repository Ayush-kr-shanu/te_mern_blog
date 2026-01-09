const Joi = require("joi");
const pick = require("../utils/pick");

const validate = (schema) => (request, _response, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(request, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new Error(errorMessage));
  }
  Object.assign(request, value);
  return next();
};

module.exports = validate;
