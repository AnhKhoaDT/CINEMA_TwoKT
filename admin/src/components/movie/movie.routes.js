const express = require("express");
const router = express.Router();

const {
  createMovie,
  getAllMovies,
  getMovieDetail,
  getReleasedMovies,
  getUpcomingMovies,
  queryMovies,
  updateMovieController,
  deleteMovieController,
} = require("./movie.controller");

router.route("/").get(getAllMovies).post(createMovie);

router.put('/edit/:id', updateMovieController);

// Route xóa phim
router.delete('/delete/:id', deleteMovieController);

router.route("/detail/:id").get(getMovieDetail);

router.route("/list/released").get(getReleasedMovies);

router.route("/list/upcoming").get(getUpcomingMovies);

router.route("/query").get(queryMovies);

module.exports = router;
