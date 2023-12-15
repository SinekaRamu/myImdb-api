const Joi = require("joi");

const ratingSchema = Joi.object({
  movie_id: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  content: Joi.string().optional(),
});

module.exports = {
  ratingSchema,
};
