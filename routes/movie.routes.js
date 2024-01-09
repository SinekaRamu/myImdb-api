const express = require("express");
const router = express.Router();

const { validate } = require("../middleware/validation.middleware");
const { isAuthorised } = require("../middleware/authorization.middleware");
const {
  addMoviesController,
  getMovieController,
  updateMovieController,
  getAllMoviesController,
  deleteMovieController,
} = require("../controllers/movie.controller");
const { movieSchema } = require("../validations/movie.schema");
const { addRatingController } = require("../controllers/rating.controller");
const { ratingSchema } = require("../validations/rating.schema");

// router.get("/", overallRatingController);
router.get("/", getAllMoviesController);
router.post("/", validate(movieSchema), isAuthorised, addMoviesController);
router.get("/:id", isAuthorised, getMovieController);
router.put("/:id", isAuthorised, updateMovieController);
router.delete("/:id", isAuthorised, deleteMovieController);

//Rating
router.post(
  "/:id/rating",
  validate(ratingSchema),
  isAuthorised,
  addRatingController
);

module.exports = router;
