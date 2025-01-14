const showtimeService = require("./services/showtime.service");
const CustomError = require("../../utils/CustomError");

const addShowtime = async (req, res) => {
  try {
    const showtimeInput = req.body; // Lấy dữ liệu từ request body

    // Gọi service để thêm showtime
    const newShowtime = await showtimeService.addShowtime(showtimeInput);

    res.status(201).json({
      message: "Showtime added successfully",
      showtime: newShowtime,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
// Controller lấy danh sách showtime theo scheduleID
const getShowtimeByScheduleID = async (req, res) => {
  try {
    const { scheduleID } = req.params; // Lấy scheduleID từ URL params

    // Gọi service để lấy danh sách showtime
    const showtimes = await showtimeService.getShowtimeByScheduleID(scheduleID);

    res.status(200).json({ showtimes });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addShowtime,
  getShowtimeByScheduleID,
};
