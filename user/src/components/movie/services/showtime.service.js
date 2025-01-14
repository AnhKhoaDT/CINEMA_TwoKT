const showtimeModel = require("../models/showtime.model");
const theaterDataService = require("../../booking/services/theaterData.service");
const cinemaService = require("../../cinema/cinema.service");
const mongoose = require("mongoose");

const CustomError = require("../../../utils/CustomError");

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
      timeRanges: { start: startTime, end: endTime }, // Thêm khoảng thời gian mới
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
    const cinemasWithShowtimes = await showtimeModel.aggregate([
      // Lọc theo `scheduleID`
      { $match: { scheduleID: new mongoose.Types.ObjectId(scheduleID) } },
      // Gom nhóm theo `cinemaID`
      {
        $group: {
          _id: "$cinemaID", // Nhóm theo cinemaID
          showtimes: {
            $push: {
              id: "$_id", // ID của buổi chiếu
              startTimes: "$showAt.startTime", // Danh sách thời gian bắt đầu từ `showAt`
            },
          },
        },
      },

      // Lookup để lấy thông tin chi tiết của Cinema (nếu cần)
      {
        $lookup: {
          from: "cinemas", // Tên collection chứa Cinema
          localField: "_id", // `_id` là cinemaID sau khi nhóm
          foreignField: "_id", // `_id` của Cinema
          as: "cinemaDetails", // Thông tin chi tiết về Cinema
        },
      },

      // Biến đổi kết quả để giữ lại thông tin cần thiết
      {
        $project: {
          cinemaID: "$_id", // Cinema ID
          cinemaDetails: { $arrayElemAt: ["$cinemaDetails", 0] }, // Lấy Cinema đầu tiên
          showList: {
            $map: {
              input: "$showtimes", // Duyệt qua các buổi chiếu
              as: "showtime",
              in: {
                id: "$$showtime.id", // Lấy ID của buổi chiếu
                startTimes: "$$showtime.startTimes", // Lấy thời điểm bắt đầu
              },
            },
          },
        },
      },
    ]);

    return cinemasWithShowtimes;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while getting showtime"
    );
  }
};

const getShowtimeByCinemaID = async (cinemaID) => {
  try {
    const showtimes = await showtimeModel.find({
      cinemaID,
    });

    if (!showtimes) {
      throw new CustomError(`Not found in ${cinemaID}`, 404);
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
  showDate.setHours(0, 0, 0, 1);

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
