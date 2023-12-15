const express = require("express");
const router = express.Router();

const { validate } = require("../middleware/validation.middleware");
const { isAuthorised } = require("../middleware/authorization.middleware");
const {
  addMoviesController,
  getMovieController,
  getAllMoviesController,
} = require("../controllers/movie.controller");
const { movieSchema } = require("../validations/movie.schema");
const { addRatingController } = require("../controllers/rating.controller");
const { ratingSchema } = require("../validations/rating.schema");

router.post("/", validate(movieSchema), isAuthorised, addMoviesController);

router.post(
  "/:id/rating",
  validate(ratingSchema),
  isAuthorised,
  addRatingController
);
// router.get("/", overallRatingController);
router.get("/", getAllMoviesController);
router.get("/:id", getMovieController);

module.exports = router;
