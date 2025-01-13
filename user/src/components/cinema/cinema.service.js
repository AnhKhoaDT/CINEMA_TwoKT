const cinemaModel = require("./cinema.model");
const CustomError = require("../../utils/CustomError");

const createCinema = async (cinema) => {
  try {
    const newCinema = new cinemaModel(cinema);
    return await newCinema.save();
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCinemas = async () => {
  try {
    const cinemas = await cinemaModel.find();
    if (!cinemas) {
      throw new CustomError("No cinemas found", 404);
    }
    return cinemas;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const findById = async (id) => {
  try {
    console.log(id);
    const cinema = await cinemaModel.findById(id);

    if (!cinema) {
      throw new CustomError("Cinema not found", 404);
    }
    return cinema;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const getTheater = async (id) => {
  try {
    const cinema = await cinemaModel.findById(id);
    if (!cinema) {
      throw new CustomError("Cinema not found", 404);
    }
    return cinema.theaters;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  createCinema,
  getAllCinemas,
  findById,
  getTheater,
};
