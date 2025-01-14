const express = require("express");
const router = express.Router();
const showtimeController = require("./showtime.controller");

// Route thêm showtime
router.post("/", showtimeController.addShowtime);

// Route lấy danh sách showtime theo scheduleID
router.get("/:scheduleID", showtimeController.getShowtimeByScheduleID);

module.exports = router;
