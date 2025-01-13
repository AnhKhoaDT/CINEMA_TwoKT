const mongoose = require("mongoose");

//

const onwerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expireIn: {
    type: Date,
  },
});

const seatSchema = new mongoose.Schema({
  theaterDataID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TheaterData",
    required: true,
  },
  row: {
    type: String,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  },

  type: {
    // single, double
    type: String,
    enum: ["single", "double"],
    required: true,
  },

  owner: onwerSchema,
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
