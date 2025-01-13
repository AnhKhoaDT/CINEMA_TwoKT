document.getElementById("signup-form").addEventListener("submit", async function (event) {
    // Ngăn chặn hành vi mặc định
    event.preventDefault();

    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Kiểm tra nếu mật khẩu không khớp
    if (password !== confirmPassword) {
        console.log("ljoa")
        alert("Mật khẩu xác nhận không khớp!");
        return; // Dừng lại nếu không khớp
    }

    // Thu thập dữ liệu từ form
    const formData = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        username: document.getElementById("signup-username").value,
        email: document.getElementById("email").value,
        password: password,
    };

    try {
        // Gửi yêu cầu POST tới server
        const response = await axios.post('/auth/register', formData);

        // Xử lý phản hồi từ server
        alert("Đăng ký thành công!");
        console.log(response.data);

        document.getElementById("signup-form").reset();

        // Chuyển qua tab Đăng Nhập sau khi Đăng Ký thành công
        const loginTab = new bootstrap.Tab(document.getElementById("login-tab"));
        loginTab.show();
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert("Đã xảy ra lỗi: " + (error.response ? error.response.data.message : error.message));
    }
});



document.getElementById("login-form").addEventListener("submit", async function (event) {
    // Ngăn chặn hành vi mặc định
    event.preventDefault();

    // Thu thập dữ liệu từ form
    const formData = {
        identifier: document.getElementById("identifier").value,
        password: document.getElementById("login-password").value,
    };

    try {
        // Gửi yêu cầu POST tới server
        const response = await axios.post('/auth/login', formData);

        // Xử lý phản hồi từ server
        alert("Đăng nhập thành công!");
        console.log(response.data);

        document.getElementById("login-form").reset();

        // Điều hướng người dùng theo vai trò
        if (response.data.user.role === "customer") {
            window.location.href = "/"; // Chuyển hướng tới dashboard của khách hàng
        } else if (response.data.user.role === "admin") {
            window.location.href = "/admin-dashboard"; // Chuyển hướng tới dashboard của admin
        }
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert("Đã xảy ra lỗi: " + (error.response ? error.response.data.message : error.message));
    }
});


document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", function () {
        const passwordField = document.getElementById("signup-password");
        const confirmPasswordField = document.getElementById("confirm-password");
        const loginPasswordField = document.getElementById("login-password");
        const eyeIcon = this.querySelector("svg");

        // Kiểm tra và thay đổi loại input (password/text)
        const isPassword = passwordField?.type === "password";
        if (passwordField) passwordField.type = isPassword ? "text" : "password";
        if (confirmPasswordField) confirmPasswordField.type = isPassword ? "text" : "password";
        if (loginPasswordField) loginPasswordField.type = isPassword ? "text" : "password";

        // Thay đổi biểu tượng mắt
        eyeIcon.classList.toggle("bi-eye-slash", !isPassword);
        eyeIcon.classList.toggle("bi-eye", isPassword);
    });
});
