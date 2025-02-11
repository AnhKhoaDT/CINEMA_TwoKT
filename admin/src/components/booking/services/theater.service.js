const theaterModel = require("../models/theater.model");
const CustomError = require("../../../utils/CustomError");

// create theater

//seatData

const createTheater = async (theater) => {
  try {
    const newTheater = new theaterModel(theater);
    return await newTheater.save();
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = {
  createTheater,
  // update or something
};
