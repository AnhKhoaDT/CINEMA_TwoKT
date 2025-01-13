const seatModel = require("../models/seat.model");

const CustomError = require("../../../utils/CustomError");

const addSeat = async (seat) => {
  try {
    const newSeat = new seatModel(seat);
    return await newSeat.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const addManySeats = async (seats) => {
  try {
    return await seatModel.insertMany(seats);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const holdSeat = async (seatID, userID) => {
  try {
    const seat = await seatModel.findById(seatID);
    if (!seat) {
      throw new CustomError(`Seat ${seatID} not found`, 404);
    }

    if (seat.owner.userID && seat.owner.expireIn > new Date()) {
      throw new CustomError(`Seat ${seatID} is already hold`, 400);
    }
    seat.owner.userID = userID;
    seat.owner.expireIn = new Date().setMinutes(new Date().getMinutes() + 5);

    return await seat.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const unHoldSeat = async (seatID) => {
  try {
    const seat = await seatModel.findById(seatID);
    if (!seat) {
      throw new CustomError(`Seat ${seatID} not found`, 404);
    }

    if (!seat.owner.userID || seat.owner.expireIn < new Date()) {
      throw new CustomError(`Seat ${seatID} is not hold`, 400);
    }

    seat.owner.userID = null;
    seat.owner.expireIn = null;

    return await seat.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const bookSeat = async (seatID, userID) => {
  try {
    const seat = await seatModel.findById(seatID);
    if (!seat) {
      throw new CustomError(`Seat ${seatID} not found`, 404);
    }

    if (
      seat.owner.userID &&
      (seat.owner.expireIn || seat.owner.expireIn > new Date())
    ) {
      throw new CustomError(`Seat ${seatID} is already booked`, 400);
    }

    seat.owner.userID = userID;
    seat.owner.expireIn = null;

    return await seat.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

const unBookSeat = async (seatID) => {
  try {
    const seat = await seatModel.findById(seatID);
    if (!seat) {
      throw new CustomError(`Seat ${seatID} not found`, 404);
    }

    if (!seat.owner.userID) {
      throw new CustomError(`Seat ${seatID} is not booked`, 400);
    }

    seat.owner.userID = null;
    seat.owner.expireIn = null;

    return await seat.save();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new Error(error);
  }
};

module.exports = {
  addSeat,
  addManySeats,
};
