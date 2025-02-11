
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

// Đăng xuất
router.post("/logout", authController.logout);

module.exports = router;
