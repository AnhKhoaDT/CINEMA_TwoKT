const express = require("express");
const router = express.Router();

const {
  createMovie,
  getAllMovies,
  getMovieDetail,
  getReleasedMovies,
  getUpcomingMovies,
  queryMovies,
} = require("./movie.controller");

router.route("/").get(getAllMovies).post(createMovie);

router.route("/detail/:id").get(getMovieDetail);

router.route("/list/released").get(getReleasedMovies);

router.route("/list/upcoming").get(getUpcomingMovies);

router.route("/query").get(queryMovies);

module.exports = router;
