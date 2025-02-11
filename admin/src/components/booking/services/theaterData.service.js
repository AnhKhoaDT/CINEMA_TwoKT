const theaterDataModel = require("../models/theaterData.model");
const { addManySeats } = require("./seat.service");
const theaterModel = require("../models/theater.model");
const showtimeModel = require("../../movie/models/showtime.model");

const CustomError = require("../../../utils/CustomError");

// path to the default seats data (json file)
const defaultSeatsData = require("../../../data/defaultSeats.json");

const createTheaterData = async (theaterData) => {
  try {
    // check theaterData is valid
    // check theaterID and showtimeID is exist in db
    const theaterID = theaterData.theaterID;
    const showtimeID = theaterData.showtimeID;

    const theater = await theaterModel.findById(theaterID);

    if (!theater) {
      throw new CustomError("Theater not found", 404);
    }

    const showtime = await showtimeModel.findById(showtimeID);

    if (!showtime) {
      throw new CustomError("Showtime not found", 404);
    }

    const newTheaterData = await new theaterDataModel(theaterData).save();

    // add default seats data
    const seats = defaultSeatsData.flatMap((row) => {
      return row.seats.map((seatNumber) => ({
        theaterDataID: newTheaterData._id,
        row: row.row,
        type: row.type,
        col: seatNumber,
        status: "available", // Trạng thái mặc định
      }));
    });

    console.log(seats);

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

    const theaterData = await theaterDataModel
      .find({ theaterID, showDate });
    
    if (!theaterData) {
      throw new CustomError("Theater data not found", 404);
    }

    return theaterData;
  }
  catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
}


module.exports = {
  createTheaterData,
};
