const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
    "string.base": "first must be a string"
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required"
  }),
  email: Joi.string().required().email().messages({
    'string.email': 'email is invalid',
    'any.required': 'email is required'
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is require",
    "string.alphanum": "password must contain number or alphabet",
    "string.min": "password must have at least 6 characters"
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is require"
    })
    .strip()
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

exports.validateLogin = validate(loginSchema);
