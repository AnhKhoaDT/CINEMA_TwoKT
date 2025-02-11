const theaterDataModel = require("../models/theaterData.model");
const { addManySeats } = require("./seat.service");
const theaterModel = require("../../cinema/theater.model");
const showtimeModel = require("../../movie/models/showtime.model");

const CustomError = require("../../../utils/CustomError");

// path to the default seats data (json file)
const defaultSeatsData = require("../../../data/defaultSeats.json");

const createTheaterData = async (theaterData) => {
  try {
    // check theaterData is valid
    // check theaterID and showtimeID is exist in db
    const theaterID = theaterData.theaterID;

    const theater = await theaterModel.findById(theaterID);

    if (!theater) {
      throw new CustomError("Theater not found", 404);
    }

    const newTheaterData = await new theaterDataModel(theaterData).save();

    // add default seats data

    const seats = defaultSeatsData.flatMap((row) => {
      // Kiểm tra nếu seatNumbers tồn tại và là một mảng
      if (Array.isArray(row.seatNumbers)) {
        return row.seatNumbers.map((seatNumber) => ({
          theaterDataID: newTheaterData._id, // ID của phòng chiếu
          row: row.row, // Hàng ghế
          type: row.type, // Loại ghế (single/double)
          col: seatNumber, // Số ghế trong hàng
          status: "available", // Trạng thái ghế mặc định là available
          price: type === "double" ? 120000 : 80000, // Giá vé mặc định
        }));
      } else {
        console.error(`Invalid seatNumbers in row ${row.row}`);
        return []; // Nếu không có seatNumbers hợp lệ, trả về mảng rỗng
      }
    });

    await addManySeats(seats);

    return newTheaterData;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const queryTheaterData = async (query) => {
  try {
    const theaterID = query.theaterID;
    const showDate = query.showDate;

    const theaterData = await theaterDataModel.find({ theaterID, showDate });

    if (!theaterData) {
      throw new CustomError("Theater data not found", 404);
    }

    return theaterData;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  createTheaterData,
  queryTheaterData,
};
