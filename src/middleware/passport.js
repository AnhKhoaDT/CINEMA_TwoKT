const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../components/user/user.model"); // Đường dẫn tới model User
const bcrypt = require("bcrypt");

// Cấu hình chiến lược `local` để xác thực bằng email hoặc username và password
passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier", // Sử dụng chung trường "identifier" cho cả email và username
      passwordField: "password", // Trường mật khẩu
    },
    async (identifier, password, done) => {
      try {
        // Tìm người dùng theo email hoặc username
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
          return done(null, false, { message: "Incorrect username or email" });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password" });
        }

        // Trả về người dùng nếu xác thực thành công
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Lưu thông tin người dùng vào session
passport.serializeUser((user, done) => {
  const sessionData = { id: user.id, role: user.role }; // Lưu vai trò người dùng
  done(null, sessionData);
});

// Lấy thông tin người dùng từ session
passport.deserializeUser(async (sessionData, done) => {
  try {
    const user = await User.findById(sessionData.id).select("-password");
    user.role = sessionData.role; // Gán lại vai trò từ session
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
