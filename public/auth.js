
document.getElementById("signup-form").addEventListener("submit", function (event) {
     // Prevent default form submission

    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!Ahihi");
        return; // Stop if passwords do not match
    }

    // Remove the 'name' attribute from 'confirm-password' to prevent it from being sent to the server
    document.getElementById("confirm-password").removeAttribute("name");

    // Submit the form programmatically
    this.submit();
});

 // Hàm chuyển đổi giữa Login và Register
 function toggleForm(isLogin) {
    document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none';
    document.getElementById('registerForm').style.display = isLogin ? 'none' : 'block';
}

// Hàm xử lý khi submit form
async function handleSubmit(event, isLogin) {
    event.preventDefault();
    let apiUrl = isLogin ? '/auth/login' : '/auth/register';
    let formData = {};

    // Lấy dữ liệu từ form
    if (isLogin) {
        formData = {
            identifier: document.getElementById('loginIdentifier').value,
            password: document.getElementById('loginPassword').value,
        };
    } else {
        formData = {
            name: document.getElementById('registerName').value,
            dob: document.getElementById('registerDob').value,
            phone: document.getElementById('registerPhone').value,
            username: document.getElementById('registerUsername').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
        };
    }

    try {
        // Gửi yêu cầu tới server
        const response = await axios.post(apiUrl, formData);
        console.log(response.data);

        // Xử lý phản hồi từ server
        if (isLogin) {
            alert('Login successful');
            // Redirect tùy theo vai trò
            if (response.data.user.role === 'customer') {
                window.location.href = '/customer-dashboard';  // Redirect tới trang của user
            } else if (response.data.user.role === 'admin') {
                window.location.href = '/admin-dashboard';  // Redirect tới trang của admin
            }
        } else {
            alert('Register successful');
            toggleForm(true);  // Chuyển sang form login
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert('An error occurred: ' + (error.response ? error.response.data.message : error.message));
    }
}

 // Hàm để chuyển đổi hiển thị mật khẩu
 document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('loginPassword');
    const confirmPasswordField = document.getElementById('registerPassword');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        if (confirmPasswordField) {
            confirmPasswordField.type = 'text';
        }
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
    } else {
        passwordField.type = 'password';
        if (confirmPasswordField) {
            confirmPasswordField.type = 'password';
        }
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
    }
});