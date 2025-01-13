const express = require('express');

const axios = require('axios');

const router = express.Router();

const {WEB_URL} = require('./config/env.js');

// Import routes    
const userRoutes = require('./components/user/user.routes');
const authRoutes = require('./components/auth/auth.routes');
const movieRoutes = require('./components/movie/movie.routes');
const Movie = require('./components/movie/models/movie.model.js');

// User routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);// lấy tất cả phim

router.get('/',async (req, res) => {
    try {
      
        res.render('auth');
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

router.get('/admin-dashboard',async(req,res)=>{
    try{
        res.render('dashboard');
    }catch(error){
        console.error(error);
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const movie = await Movie.findById(id); // Truy vấn phim từ database

        if (!movie) {
            return res.status(404).send('Phim không tồn tại.');
        }

        // Render view movieedit.ejs và truyền movie
        res.render('movieedit', { movie });
    } catch (error) {
        console.error('Lỗi khi tải phim để chỉnh sửa:', error);
        res.status(500).send('Lỗi server.');
    }
});



router.get('/list-movie', async (req, res) => {
    try {
        const response = await axios.get(`${WEB_URL}/movies/query`);
        console.log(response.data); // Kiểm tra cấu trúc dữ liệu trả về

        const moviesData = response.data.movies || {};
        const movies = moviesData.movies || [];
        const page = moviesData.page || 1; // Trang hiện tại từ server
        const totalPages = moviesData.totalPages || 1; // Tổng số trang từ server
        console.log(movies,page,totalPages);
        res.render('movielist',{movies,page,totalPages});
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phim:', error.message);
        res.status(500).send('Đã xảy ra lỗi khi tải danh sách phim.');
    }
});


router.get('/add-movie',async (req, res) => {
    try {
      
        res.render('movieadd');
    } catch (error) {
        console.error(error);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        
        // Render giao diện `movieedit.ejs` và truyền dữ liệu phim
        res.render('movieedit');
    } catch (error) {
        console.error('Lỗi khi tải phim để chỉnh sửa:', error);
        res.status(500).send('Lỗi server.');
    }
});

router.get('/admin-dashboard/cinema-list',async (req, res) => {
    try {
      
        res.render('cinemalist');
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
