const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Đảm bảo cookie được gửi kèm trong tất cả các request


const bodyParser = require('body-parser');
const passport = require("./middleware/passport"); // Import passport middleware
const { connectDB } = require('./config/db.js'); // Import connectDB function
const { PORT, ENVIRONMENT, KEY_SESSION } = require("../src/config/env"); // Import PORT and ENVIRONMENT variables

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Import routes
const routes = require('./index.js');


app.use(cors());
  
  // Middleware quản lý session
app.use(
    session({
      secret: KEY_SESSION, // Khóa bí mật dùng để mã hóa session
      resave: false, // Không lưu session lại nếu không thay đổi
      saveUninitialized: false, // Không lưu session chưa được khởi tạo
      cookie: {
        httpOnly: true, // Chỉ cho phép cookie được truy cập bởi server
        secure: false, // Đặt `true` nếu sử dụng HTTPS
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // Cookie hết hạn sau 1 ngày
      },
    })
);
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Nếu `req.session.user` không tồn tại, đặt `user` là null
    console.log("Session ID (connect.sid):", req.sessionID);
    next();
  });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//view engine setup
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));


app.set('views', path.join(__dirname, 'views'));


// Use routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const error = ENVIRONMENT === 'development' ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Log error on server
    console.error(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});