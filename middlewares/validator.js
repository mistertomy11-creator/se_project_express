const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),

    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    avatarUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatarUrl" field must be filled in',
      "string.url": 'the "avatarUrl" field must be a valid url',
    }),

    Email: Joi.string().required().email(),

    password: Joi.string().required().messages({
      "string.min": 'The minimum length of the "email" field is 8',
    }),

    postId: Joi.string().alphanum().length(24),
  }),
});
