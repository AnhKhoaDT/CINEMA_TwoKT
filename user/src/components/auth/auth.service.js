
const User = require("../user/user.model");
const bcrypt = require("bcrypt");

// đăng nhập
const loginUser = async (data) => {
  const { identifier, password } = data;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) throw { status: 401, message: "Invalid credentials" };

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw { status: 401, message: "Invalid credentials" };

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
  };
};

// Lấy thông tin người dùng
const getUserDetails = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Đăng xuất người dùng
const logoutUser = async (userId) => {
  return { message: "User logged out successfully" };
};

module.exports = { loginUser, getUserDetails, logoutUser };
