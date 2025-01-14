// Mock user data
const userData = {
    avatar: "/assets/avatar.jpg",
    username: "Khoa123",
    fullname: "Trần Anh Khoa",
    dob: "2004-05-06",
    phone: "0123456789",
    email: "khoa1236@gmail.com"
};

// Load user data into the profile
function loadUserData() {
    document.getElementById("avatar").src = userData.avatar;
    document.getElementById("username").textContent = `Username: ${userData.username}`;
    document.getElementById("fullname").textContent = `Full Name: ${userData.fullname}`;
    document.getElementById("dob").textContent = `Date of Birth: ${userData.dob}`;
    document.getElementById("phone").textContent = `Phone: ${userData.phone}`;
    document.getElementById("email").textContent = `Email: ${userData.email}`;
}

// Handle form submission for editing user info
document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();
    userData.username = document.getElementById("editUsername").value || userData.username;
    userData.fullname = document.getElementById("editFullname").value || userData.fullname;
    userData.dob = document.getElementById("editDob").value || userData.dob;
    userData.phone = document.getElementById("editPhone").value || userData.phone;
    userData.email = document.getElementById("editEmail").value || userData.email;
    loadUserData();
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});

// Initialize the page
document.addEventListener("DOMContentLoaded", loadUserData);

  