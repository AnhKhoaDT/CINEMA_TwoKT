const scheduleModel = require("../models/schedule.model");
const movieModel = require("../models/movie.model");
const showtimeService = require("./showtime.service");
const moment = require("moment");

const CustomError = require("../../../utils/CustomError");

const addSchedule = async (scheduleInput) => {
  try {
    const movieID = scheduleInput.movieID;
    const date = moment(scheduleInput.date).utc().add(7, "hours").toDate();
    console.log(date);

    const movie = await movieModel.findById(movieID);

    if (!movie) {
      throw new CustomError(`Movie ${movieID} not found`, 404);
    }

    const schedule = new scheduleModel({ movieID, date });

    if (await isTaken(movieID, date)) {
      throw new CustomError("Schedule already exists", 400);
    }

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

const isTaken = async (movieID, date) => {
  try {
    const schedule = await scheduleModel.findOne({ movieID, date });
    console.log(movieID);
    console.log(date);
    console.log(schedule);
    return schedule ? true : false;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addSchedule,
  getMovieSchedules,
};
