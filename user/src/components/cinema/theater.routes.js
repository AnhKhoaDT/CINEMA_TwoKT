const express = require("express");

const router = express.Router();

const { createTheaterController } = require("./theater.controller");

router.route("/").post(createTheaterController);

module.exports = router;