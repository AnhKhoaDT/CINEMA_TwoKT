const express = require('express');

const axios = require('axios');

const router = express.Router();

const {WEB_URL} = require('./config/env.js');

// Import routes    
const userRoutes = require('./components/user/user.routes');
const authRoutes = require('./components/auth/auth.routes');
const movieRoutes = require('./components/movie/movie.routes');

// User routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);// lấy tất cả phim

router.get('/',async (req, res) => {
    try {
        const response = await axios.get(`${WEB_URL}/movies`);
      
        res.render('index', { movies: response.data.movies });
    } catch (error) {
        console.error(error);
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const movieId = req.params.id; // Lấy id từ URL
        const response = await axios.get(`${WEB_URL}/movies/${movieId}`);
        
        res.render('movies', { movie: response.data.movie }); // Trả về chi tiết của một phim
    } catch (error) {
        
        console.error(error);
    }
});


router.get('/register', (req, res) => {
    try {
        res.render('auth'); // Truyền activeTab để xác định tab hiển thị
    } catch (error) {
        console.error(error);
    }
});

router.get('/movielist', async (req, res) => {
    try {
        const response = await axios.get(`${WEB_URL}/movies/query`);
        console.log(response.data); // Kiểm tra cấu trúc dữ liệu trả về

        const moviesData = response.data.movies || {};
        const movies = moviesData.movies || [];
        const page = moviesData.page || 1; // Trang hiện tại từ server
        const totalPages = moviesData.totalPages || 1; // Tổng số trang từ server

        res.render('movieList', { movies, page, totalPages });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phim:', error.message);
        res.status(500).send('Đã xảy ra lỗi khi tải danh sách phim.');
    }
});



module.exports = router;
