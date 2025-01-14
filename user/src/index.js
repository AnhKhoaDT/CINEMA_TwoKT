const express = require("express");

const axios = require("axios");

const router = express.Router();

const { WEB_URL } = require("./config/env.js");

// Import routes
const userRoutes = require("./components/user/user.routes");
const authRoutes = require("./components/auth/auth.routes");
const movieRoutes = require("./components/movie/movie.routes");
const showtimeRoutes = require("./components/movie/showtime.routes");
const theaterRoutes = require("./components/cinema/theater.routes");
const bookingRoutes = require("./components/booking/booking.routes");
const cinemaRoutes = require("./components/cinema/cinema.routes");
const scheduleRoutes = require("./components/movie/schedule.routes");

// User routes
router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/movies", movieRoutes); // lấy tất cả phim
router.use("/api/showtimes", showtimeRoutes); // lấy tất cả suất chiếu
router.use("/api/theaters", theaterRoutes); // lấy tất cả rạp
router.use("/api/bookticket", bookingRoutes); // đặt vé
router.use("/api/cinema", cinemaRoutes); // lấy tất cả rạp
router.use("/api/schedule", scheduleRoutes); // lấy tất cả lịch chiếu

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${WEB_URL}/api/movies`);

    res.render("index", { movies: response.data.movies });
  } catch (error) {
    console.error(error);
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const movieId = req.params.id; // Lấy id từ URL

    const response = await axios.get(`${WEB_URL}/api/movies/detail/${movieId}`);
    console.log(response.data.movie); // Kiểm tra cấu trúc dữ liệu trả về
    res.render("movies", { movie: response.data.movie }); // Trả về chi tiết của một phim
  } catch (error) {
    console.error(error);
  }
});

router.get("/register", (req, res) => {
  try {
    res.render("auth"); // Truyền activeTab để xác định tab hiển thị
  } catch (error) {
    console.error(error);
  }
});

router.get("/movielist", async (req, res) => {
  try {
    const response = await axios.get(`${WEB_URL}/movies/query`);
    console.log(response.data); // Kiểm tra cấu trúc dữ liệu trả về

    const moviesData = response.data.movies || {};
    const movies = moviesData.movies || [];
    const page = moviesData.page || 1; // Trang hiện tại từ server
    const totalPages = moviesData.totalPages || 1; // Tổng số trang từ server

    res.render("movieList", { movies, page, totalPages });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error.message);
    res.status(500).send("Đã xảy ra lỗi khi tải danh sách phim.");
  }
});

router.get("/booking/:id", async (req, res) => {
  try {
    const movieId = req.params.id; // Lấy id từ URL

    const response_movie = await axios.get(
      `${WEB_URL}/api/movies/detail/${movieId}`
    );

    const schedule_data = await axios.get(`${WEB_URL}/api/schedule/${movieId}`);

    const response_showtime = await axios.get(
      `${WEB_URL}/api/showtimes/${schedule_data.data.schedules._id}`
    );

    console.log(response_showtime.data.showtimes);
    //console.log(response_showtime.data.showtimes);

    //console.log(response_movie.data.movie);
    // Kiểm tra cấu trúc dữ liệu trả về

    res.render("booking", {
      movie: response_movie.data.movie,
      showtimes: response_showtime.data.showtimes,
    }); // Trả về trang đặt vé
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi khi tải trang đặt vé.");
  }
});

module.exports = router;
