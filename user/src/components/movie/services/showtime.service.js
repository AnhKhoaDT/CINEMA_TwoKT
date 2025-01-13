const showtimeModel = require("../models/showtime.model");
const theaterDataService = require("../../theater/services/theaterData.service");
const cinemaService = require("../../cinema/cinema.service");

const CustomError = require("../../../utils/CustomError");

//showtimeInput
// {
//   "scheduleID": "60f1b9b3b3b3b32f1c8f1b3b",
//   "cinemaID": "60f1b9b3b3b3b32f1c8f1b3b",
//   "showAt": {
//     "startTime": "12:00:00",
//     "endTime": "2021-07-17T10:00:00.000Z",
//     "theaterID": "60f1b9b3b3b3b32f1c8f1b3b"
//   }
// }

// showtimeObject
// {
//   "scheduleID": "60f1b9b3b3b3b32f1c8f1b3b",
//   "cinemaID": "60f1b9b3b3b3b32f1c8f1b3b",
//   "showAt": {
//     "startTime": "2021-07-17T08:00:00.000Z",
//     "endTime": "2021-07-17T10:00:00.000Z",
//     "theaterDataID": "60f1b9b3b3b3b32f1c8f1b3b"
//   }
// }

const addShowtime = async (showtimeInput) => {
  try {
    const { scheduleID, cinemaID, showAt } = showtimeInput;
    const { startTime, endTime, theaterID } = showAt;

    // Tìm thông tin rạp (cinema)
    const cinema = await cinemaService.findById(cinemaID);
    if (!cinema || !cinema.theaters.includes(theaterID)) {
      throw new CustomError("Theater not found in cinema", 404);
    }

    // Kiểm tra thời gian chiếu có hợp lệ không
    const isValid = await isValidShowtime({ scheduleID, cinemaID, showAt });
    if (!isValid) {
      throw new CustomError("Fail ! Input have conflict time", 409);
    }

    // Tạo mới TheaterData
    const theaterData = await theaterDataService.createTheaterData({
      theaterID,
      showDate: new Date(startTime).setHours(0, 0, 0, 0), // Chỉ giữ lại ngày
      timeRanges: [{ start: startTime, end: endTime }], // Thêm khoảng thời gian mới
    });

    // Tạo buổi chiếu mới
    const newShowtime = new showtimeModel({
      scheduleID,
      cinemaID,
      showAt: {
        startTime,
        endTime,
        theaterDataID: theaterData._id, // Tham chiếu đến TheaterData vừa tạo
      },
    });

    return await newShowtime.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error.message || "An error occurred while adding showtime");
  }
};

const getShowtimeByScheduleID = async (scheduleID) => {
  try {
    const showtimes = await showtimeModel.find({ scheduleID: scheduleID });

    if (!showtimes) {
      throw new CustomError(`Not found in ${scheduleID}`, 404);
    }

    return showtimes;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const isValidShowtime = async (showtime) => {
  const { showAt } = showtime;
  const { startTime, endTime, theaterID } = showAt;

  // Đảm bảo ngày được so sánh chính xác (set về 00:00:00)
  const showDate = new Date(startTime);
  showDate.setHours(0, 0, 0, 0);

  // Lấy dữ liệu lịch chiếu của rạp trong ngày
  const theaterData = await theaterDataService.queryTheaterData({
    theaterID,
    showDate,
  });

  // Nếu không có dữ liệu nào, không có xung đột
  if (!theaterData || theaterData.length === 0) {
    return true;
  }

  // Duyệt qua tất cả dữ liệu lịch chiếu để kiểm tra xung đột
  for (const data of theaterData) {
    const { timeRanges } = data;

    for (const range of timeRanges) {
      const { start, end } = range;

      // So sánh khoảng thời gian
      if (
        (startTime >= start && startTime < end) || // Bắt đầu mới nằm trong khoảng thời gian cũ
        (endTime > start && endTime <= end) || // Kết thúc mới nằm trong khoảng thời gian cũ
        (startTime <= start && endTime >= end) // Khoảng mới bao phủ khoảng cũ
      ) {
        return false; // Có xung đột
      }
    }
  }

  // Không có xung đột
  return true;
};

module.exports = {
  addShowtime,
  getShowtimeByScheduleID,
  isValidShowtime,
};
