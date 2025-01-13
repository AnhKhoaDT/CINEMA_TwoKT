const express = require("express");

const router = express.Router();

const { createCinema, getAllCinemas } = require("./cinema.controller");

router.route("/").get(getAllCinemas).post(createCinema);

module.exports = router;
