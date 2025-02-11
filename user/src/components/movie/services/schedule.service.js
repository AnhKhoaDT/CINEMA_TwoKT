const scheduleModel = require("../models/schedule.model");
const movieModel = require("../models/movie.model");
const showtimeService = require("./showtime.service");

const CustomError = require("../../../utils/CustomError");

const addSchedule = async (scheduleInput) => {
  try {
    const movieID = scheduleInput.movieID;
    const date = scheduleInput.date;

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
    // Lấy thời gian bắt đầu và kết thúc của ngày hôm nay
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Đặt giờ là 00:00:00.000

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Đặt giờ là 23:59:59.999

    // Tìm các lịch chiếu của phim theo `movieId` và `date` trong khoảng thời gian hôm nay
    const schedules = await scheduleModel.findOne({
      movieID: movieId,
      // date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!schedules || schedules.length === 0) {
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
