const Theater = require("./theater.model"); // Model Theater
const Cinema = require("./cinema.model"); // Model Cinema
const CustomError = require("../../utils/CustomError");

const createTheater = async (cinemaID, theaterData) => {
  try {
    // Tạo theater mới
    const newTheater = new Theater(theaterData);

    // Lưu theater vào database
    const savedTheater = await newTheater.save();

    // Cập nhật danh sách theaters trong Cinema
    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaID,
      { $push: { theaters: savedTheater._id } }, // Thêm ID theater vào mảng theaters
      { new: true }
    );

    if (!updatedCinema) {
      throw new CustomError("Cinema not found", 404);
    }

    return savedTheater;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = {
  createTheater,
};
