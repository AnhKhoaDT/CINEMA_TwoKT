const scheduleService = require("./services/schedule.service");
const customError = require("../../utils/CustomError");

const addSchedule = async (req, res) => {
  try {
    const scheduleInput = req.body;

    await scheduleService.addSchedule(scheduleInput);

    res.status(201).json({ message: "Schedule added susccessfully" });
  } catch (error) {
    if (error instanceof customError) {
      console.log(error);
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getMovieSchedules = async (req, res) => {
  try {
    const movieID = req.params.movieID;

    const schedules = await scheduleService.getMovieSchedules(movieID);
    res.status(200).json({ schedules });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSchedule,
  getMovieSchedules,
};
