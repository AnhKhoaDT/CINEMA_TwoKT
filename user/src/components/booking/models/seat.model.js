const { required } = require("joi");
const mongoose = require("mongoose");

//

const onwerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expireIn: {
    type: Date,
    deffault: null,
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
  price: {
    type: Number,
    required: true,
    default: 0,
  },

  owner: onwerSchema,
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
