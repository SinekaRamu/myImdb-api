const Joi = require("joi");

const movieSchema = Joi.object({
  // image: Joi.array().required(),
  title: Joi.string().required(),
  story: Joi.string().optional(),
  language: Joi.string().optional(),
  year: Joi.number().required(),
});

module.exports = {
  movieSchema,
};
