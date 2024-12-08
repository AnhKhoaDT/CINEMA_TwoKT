const mongoose = require("mongoose");

//contact cinema schema
const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Main Cinema Schema
const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: contactSchema,
    theaters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const cinemaModel = mongoose.model("Cinema", cinemaSchema);

module.exports = cinemaModel;
