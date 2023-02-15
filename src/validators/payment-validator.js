const Joi = require("joi");

const validate = require("./validate");

const createPaymentSchema = Joi.object({
  // title: Joi.string().trim(),
  image: Joi.string().trim()
})
  // .or("title", "image");

exports.validateUploadSlip = validate(createPaymentSchema);
