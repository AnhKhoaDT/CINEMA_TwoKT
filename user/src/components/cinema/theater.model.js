const mongoose = require("mongoose");

// seat

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },

  // status active, inactive
  status: {
    type: String,
    required: true,
  },
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
