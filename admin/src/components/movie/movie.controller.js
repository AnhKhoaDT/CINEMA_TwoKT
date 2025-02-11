const movieService = require("./services/movie.service");

const customError = require("../../utils/CustomError");
const Movie =require("./models/movie.model")

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

const updateMovieController = async (req, res) => {
  try {
      const { id } = req.params; // Lấy ID từ URL
      const updatedData = req.body; // Dữ liệu từ frontend gửi lên

      if (!id || !updatedData) {
          return res.status(400).json({ success: false, message: "Dữ liệu không hợp lệ." });
      }

      // Cập nhật phim trong MongoDB
      const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedMovie) {
          return res.status(404).json({ success: false, message: "Không tìm thấy phim." });
      }

      res.status(200).json({ success: true, message: "Cập nhật thành công.", movie: updatedMovie });
  } catch (error) {
      console.error("Lỗi server:", error);
      res.status(500).json({ success: false, message: "Lỗi server." });
  }
};

const deleteMovieController = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ success: false, message: "ID của phim không hợp lệ!" });
      }

      const movie = await Movie.findByIdAndDelete(id);

      if (!movie) {
          return res.status(404).json({ success: false, message: "Không tìm thấy phim!" });
      }

      res.status(200).json({ success: true, message: "Xóa phim thành công!" });
  } catch (error) {
      console.error("Lỗi server khi xóa phim:", error);
      res.status(500).json({ success: false, message: "Đã xảy ra lỗi server!" });
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
  updateMovieController,
  deleteMovieController,
};
