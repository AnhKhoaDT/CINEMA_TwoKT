const { date } = require("joi");
const mongoose = require("mongoose");

// schedule day
const scheduleSchema = new mongoose.Schema({
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
