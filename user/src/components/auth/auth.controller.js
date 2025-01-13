
const passport = require("passport");
const authService = require("./auth.service");
const userService = require("../user/user.services");

// Đăng ký người dùng
const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Đăng nhập
const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });

    req.login(user, async (loginErr) => {
      if (loginErr) return next(loginErr);

      const loggedInUser = await authService.getUserDetails(user._id);

      // Gửi session ID cùng với phản hồi
      return res.status(200).json({
        message: "User logged in successfully",
        user: loggedInUser,
        sessionId: req.sessionID, // Gửi session ID trong phản hồi
      });
    });
  })(req, res, next);
};

// Đăng xuất

const logout = async (req, res) => {
  try {
    // Xóa session và logout người dùng
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed", error: err });
      }
      // Trả về phản hồi sau khi logout thành công
      res.status(200).json({ message: "User logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout };


