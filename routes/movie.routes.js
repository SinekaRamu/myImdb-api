const express = require("express");
const router = express.Router();

const { validate } = require("../middleware/validation.middleware");
const { isAuthorised } = require("../middleware/authorization.middleware");
const {
  addMoviesController,
  getMoviesController,
} = require("../controllers/movie.controller");
const { movieSchema } = require("../validations/movie.schema");
const {
  addRatingController,
  overallRatingController,
} = require("../controllers/rating.controller");
const { ratingSchema } = require("../validations/rating.schema");

router.post("/", validate(movieSchema), isAuthorised, addMoviesController);

router.post(
  "/m/rating",
  validate(ratingSchema),
  isAuthorised,
  addRatingController
);
// router.get("/", overallRatingController);
router.get("/", getMoviesController);

module.exports = router;
