const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

/*module.exports.validateId = celebrate({
  params: Joi.object()
    .keys({
      itemId: Joi.string().hex().length(24),
      userId: Joi.string().hex().length(24),
    })
    .or("itemId", "userId"),
});*/

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),

    avatarUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatarUrl" field must be filled in',
      "string.uri": 'The "avatarUrl" field must be a valid URL',
    }),

    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),

    postId: Joi.string().hex().length(24),
  }),
});
