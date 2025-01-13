const { timeout } = require("cron");
const { date } = require("joi");
const { default: mongoose } = require("mongoose");

//  theaterDataModel has theaterID and showtimeID fields that reference the Theater and Showtime models, respectively.
const theaterDataModel = new mongoose.Schema({
  theaterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
  },
  timeRanges: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  showDate: {
    type: Date,
    required: true,
  },

  // can be updated in the future
});

theaterDataModel.pre("save", function (next) {
  if (this.showDate) {
    this.showDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili-giây thành 0
  }
  next();
});

const TheaterData = mongoose.model("TheaterData", theaterDataModel);

module.exports = TheaterData;
