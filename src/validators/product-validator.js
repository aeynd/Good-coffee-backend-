const Joi = require("joi");

const validate = require("./validate");

const createProductSchema = Joi.object({
  title: Joi.string().trim(),
  image: Joi.string().trim(),
  price: Joi.string().trim()
}).or("title", "image", "price");

exports.validateCreateProduct = validate(createProductSchema);
