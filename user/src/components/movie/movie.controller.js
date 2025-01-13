const movieService = require("./services/movie.service");

const customError = require("../../utils/CustomError");

const createMovie = async (req, res) => {
  try {
    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json({ movie: newMovie });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getMovieDetail = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json({ movie });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json({ movies });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getReleasedMovies = async (req, res) => {
  try {
    const movies = await movieService.getReleasedMovies();
    res.status(200).json({ movies });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await movieService.getUpcomingMovies();
    res.status(200).json({ movies });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const addShowtime = async (req, res) => {
  try {
    const movie = await movieService.addShowtime(req.params.id, req.body.date);
    res.status(200).json({ movie });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const queryMovies = async (req, res) => {
  try {
    const movies = await movieService.filterMovies(req.query);
    res.status(200).json({ movies });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addShowtime,
  createMovie,
  getMovieDetail,
  getAllMovies,
  getReleasedMovies,
  getUpcomingMovies,
  queryMovies,
};
