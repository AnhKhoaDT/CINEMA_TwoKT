const express = require("express");
const router = express.Router();
const scheduleController = require("./schedule.controller");

// Route thêm lịch chiếu
router.post("/", scheduleController.addSchedule);

// Route lấy danh sách lịch chiếu của một phim
router.get("/:movieID", scheduleController.getMovieSchedules);

module.exports = router;
