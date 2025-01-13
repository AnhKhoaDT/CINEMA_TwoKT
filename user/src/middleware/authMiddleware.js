function isAuthenticated(req, res, next) {
  console.log("Checking if user is authenticated");
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next(); // Người dùng đã đăng nhập, tiếp tục xử lý request
  }
  return res.status(401).json({ message: "Unauthorized: Please log in" }); // Chưa đăng nhập
}

function authorize(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  };
}

module.exports = {
  isAuthenticated,
  authorize,
};
