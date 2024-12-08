const cinemaService = require("./cinema.service");
const customError = require("../../utils/CustomError");

const createCinema = async (req, res) => {
  try {
    const newCinema = await cinemaService.createCinema(req.body);
    res.status(201).json({ cinema: newCinema });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaService.getAllCinemas();
    res.status(200).json({ cinemas });
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCinema,
  getAllCinemas,
};
