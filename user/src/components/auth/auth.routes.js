
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { validateBody } = require("../../middleware/validation");
const { userSchema } = require("../../schemas/user.schemas");
const { idSchema } = require("../../schemas/id.schemas");

// Đăng ký
router.post("/register", validateBody(userSchema), authController.register);

// Đăng nhập
router.post("/login", authController.login);


router.get("/status", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.session.user,
    });
  }
  res.status(401).json({ isAuthenticated: false });
});

  
  // Đăng xuất
  router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.clearCookie("connect.sid"); // Xóa cookie của session
      res.status(200).json({ message: "Logout successful" });
    });
  });


module.exports = router;
