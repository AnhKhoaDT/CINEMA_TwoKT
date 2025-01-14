const express = require("express");

const axios = require("axios");
axios.defaults.withCredentials = true;
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
    console.log("User: ", req.session.user); 
    res.render("index", { 
      movies: response.data.movies, 
      user: req.session.user || null 
    });
    
  } catch (error) {
    console.error(error);
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const movieId = req.params.id; // Lấy id từ URL

    const response = await axios.get(`${WEB_URL}/api/movies/detail/${movieId}`);
    console.log(response.data.movie); // Kiểm tra cấu trúc dữ liệu trả về
    res.render("movies", { 
      movie: response.data.movie, 
      user: req.session.user || null 
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/register", (req, res) => {
  try {
   
    res.render("auth", { 
      user: req.session.user || null 
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/movielist", async (req, res) => {
  try {
    const response = await axios.get(`${WEB_URL}api/movies/query`);
    const moviesData = response.data.movies || {};
    const movies = moviesData.movies || [];
    const page = moviesData.page || 1;
    const totalPages = moviesData.totalPages || 1;

    res.render("movieList", { 
      movies, 
      page, 
      totalPages, 
      user: req.session.user || null 
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error.message);
    res.status(500).send("Đã xảy ra lỗi khi tải danh sách phim.");
  }
});

router.get("/booking/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const response_movie = await axios.get(`${WEB_URL}/api/movies/detail/${movieId}`);
    const response_showtime = await axios.get(`${WEB_URL}/api/showtimes/${movieId}`);

    res.render("booking", { 
      movie: response_movie.data.movie, 
      showtimes: response_showtime.data.showtimes, 
      user: req.session.user || null 
    });
  } catch (error) {
    console.error(error);
  }
});


const checkLoginStatus = async () => {
  try {
    const response = await axios.get("http://localhost/api/auth/status", { withCredentials: true });
    if (response.data.isAuthenticated) {
      console.log("User is authenticated:", response.data.user);
    } else {
      console.log("User is not authenticated.");
    }
  } catch (error) {
    console.error("Error checking login status:", error.response?.data || error.message);
  }
};

router.get("/contact", (req, res) => {
  try {
   
    res.render("contact", { 
      user: req.session.user || null 
    });
  } catch (error) {
    console.error(error);
  }
});

checkLoginStatus();




module.exports = router;
