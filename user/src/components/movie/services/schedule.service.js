const scheduleModel = require("../models/schedule.model");
const movieModel = require("../models/movie.model");
const showtimeService = require("./showtime.service");

const CustomError = require("../../../utils/CustomError");

const addSchedule = async (scheduleInput) => {
  try {
    const movieID = scheduleInput.movieID;
    const date = scheduleInput.date;
    const showtimes = scheduleInput.showtimes;

    const movie = await movieModel.findById(movieID);

    if (!movie) {
      throw new CustomError(`Movie ${movieID} not found`, 404);
    }

    const schedule = new scheduleModel({ movieID, date });
    const newSchedule = await schedule.save();

    if (!newSchedule) {
      throw new CustomError("Failed to add schedule", 500);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const getMovieSchedules = async (movieId) => {
  try {
    const schedules = await scheduleModel.find({ movieID: movieId });
    if (!schedules) {
      throw new CustomError("Schedules not found", 404);
    }
    return schedules;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  addSchedule,

  getMovieSchedules,
};
