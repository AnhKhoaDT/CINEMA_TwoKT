const express = require("express");
const router = express.Router();
const {
  bookSeat,
  unBookSeat,
  holdSeat,
  unHoldSeat,
} = require("./booking.controller");

// GET: /api/theater

router.route("/booking").post(bookSeat);
router.route("/unbook").post(unBookSeat);
router.route("/hold").post(holdSeat);
router.route("/unhold").post(unHoldSeat);

module.exports = router;
