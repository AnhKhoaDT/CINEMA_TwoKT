const theaterService = require("./theater.service");
const CustomError = require("../../utils/CustomError");

const createTheaterController = async (req, res) => {
  try {
    const { cinemaID, name, totalSeats, status } = req.body; // Lấy thông tin từ request body

    // Gọi service để tạo theater và cập nhật Cinema
    const newTheater = await theaterService.createTheater(cinemaID, {
      name,
      totalSeats,
      status,
    });

    res.status(201).json({ theater: newTheater });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTheaterController,
};
