const mongoose = require("mongoose");

const showAtSchema = new mongoose.Schema({
  // start and end time
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  theaterDataID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TheaterData",
    required: true,
  },
});

const showtimeSchema = new mongoose.Schema({
  scheduleID: {// truy vấn đến cái ngày 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  cinemaID: {// của rạp nào 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  showAt: [showAtSchema],// giờ
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

module.exports = Showtime;
