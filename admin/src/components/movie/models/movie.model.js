const mongoose = require("mongoose");

// Details Schema for Movie
const detailsSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

// Main Movie Schema
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    nation: {
      type: String,
      required: true,
    },
    ageRestriction: {
      type: Number,
      required: true,
    },
    details: detailsSchema, // Movie details (director, cast, etc.)
    synopsis: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1, // Rating should be between 1 and 10
      max: 10,
    },
  },
  {
    timestamps: true, // Timestamps for createdAt and updatedAt
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
