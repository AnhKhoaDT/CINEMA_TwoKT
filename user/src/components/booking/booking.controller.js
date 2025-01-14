const seatService = require("./services/seat.service");
const customError = require("../../utils/CustomError");

const holdSeat = async (req, res) => {
  try {
    const { seatID, userID } = req.body;

    const seat = await seatService.holdSeat(seatID, userID);
    res.status(200).send(seat);
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const unHoldSeat = async (req, res) => {
  try {
    const { seatID } = req.body;

    const seat = await seatService.unHoldSeat(seatID);
    res.status(200).send(seat);
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { seatID, userID } = req.body;

    const seat = await seatService.bookSeat(seatID, userID);
    res.status(200).send(seat);
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const unBookSeat = async (req, res) => {
  try {
    const { seatID } = req.body;

    const seat = await seatService.unBookSeat(seatID);
    res.status(200).send(seat);
  } catch (error) {
    if (error instanceof customError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  holdSeat,
  unHoldSeat,
  bookSeat,
  unBookSeat,
};
