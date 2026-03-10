const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Función personalizada para validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// --- FUNCIONES DE VALIDACIÓN ---

// Validar la creación de una prenda (Clothing Item)
module.exports.validateClothingItemBody = celebrate({
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
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

// Validar la creación de usuario (Signup)
module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
      "any.required": 'The "avatar" field is required',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "any.required": 'The "password" field is required',
    }),
  }),
});

// Validar el Login
module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required(),
  }),
});

// Validar IDs de usuario y artículos (Params)
module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).hex().messages({
      "string.hex": 'The "id" field must be a hexadecimal value',
      "string.length": 'The "id" field must be 24 characters long',
    }),
  }),
});

// Validar Update de perfil de usuario
module.exports.validateUserProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});
