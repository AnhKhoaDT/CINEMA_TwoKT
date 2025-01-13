const movieModel = require("../models/movie.model");

const CustomError = require("../../../utils/CustomError");

const createMovie = async (movie) => {
  try {
    const newMovie = new movieModel(movie);
    return await newMovie.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

// Get all movies
const getAllMovies = async () => {
  try {
    const movies = await movieModel.find();
    if (!movies) {
      throw new CustomError("No movies found", 404);
    }
    return movies;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

// get released movies
const getReleasedMovies = async () => {
  try {
    // Lấy các bộ phim đã phát hành và bao gồm showtimes
    const movies = await movieModel.find({
      "details.releaseDate": { $lt: new Date() }, // Lọc phim đã phát hành
    });

    // Lọc các bộ phim có ít nhất một lịch chiếu đang hoạt động (Lọc lịch chiếu trong tương lai)
    const filteredMovies = movies.filter((movie) =>
      movie.schedule.some((schedule) => {
        const showDate = new Date(schedule.date);
        // So sánh chỉ ngày mà không quan tâm giờ
        showDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 00:00:00
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 00:00:00 để so sánh ngày
        return showDate >= currentDate; // Lọc lịch chiếu trong tương lai
      })
    );

    return filteredMovies;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

// get upcoming movies
const getUpcomingMovies = async () => {
  try {
    // Lấy các bộ phim chưa phát hành
    const movies = await movieModel.find({
      "details.releaseDate": { $gt: new Date() }, // Lọc phim chưa phát hành
    });

    // Lọc các bộ phim có ít nhất một lịch chiếu trong tương lai
    const filteredMovies = movies.filter((movie) =>
      movie.schedule.some((schedule) => {
        const showDate = new Date(schedule.date);
        // So sánh chỉ ngày mà không quan tâm giờ
        showDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 00:00:00
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 00:00:00 để so sánh ngày
        return showDate >= currentDate; // Lọc lịch chiếu trong tương lai
      })
    );

    return filteredMovies;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await movieModel.findById(id).populate("showtimes");

    if (!movie) {
      throw new CustomError("Movie not found", 404);
    }
    return movie;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const filterMovies = async (filter) => {
  try {
    // Lọc các bộ phim theo điều kiện filter : genre: "Action", status: "Released",rating: 8, age: 18
    const page = filter.page || 1;
    const limit = filter.limit || 8;
    const search = filter.search || "";

    const genre = filter.genre || "All";
    const status = filter.status || "All";
    const rating = filter.rating || 0;
    const age = filter.age || 0;

    const sort = filter.sort || "rating";

    const query = {};

    if (genre !== "All") {
      query.genre = genre;
    }

    if (status !== "All") {
      query.status = status;
    }

    if (rating > 0) {
      query.rating = { $gte: rating };
    }

    if (age > 0) {
      query.ageRestriction = { $lte: age };
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const totalMovies = await movieModel.countDocuments(query);
    
    const movies = await movieModel
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    if (!movies) {
      throw new CustomError("No movies found", 404);
    }
    return {
      movies,
      totalPages: Math.ceil(totalMovies / limit),
      page
    };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  getReleasedMovies,
  getUpcomingMovies,
  filterMovies,
};
