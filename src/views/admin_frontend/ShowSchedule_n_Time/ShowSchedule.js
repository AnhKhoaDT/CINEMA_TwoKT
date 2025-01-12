// Xử lý dữ liệu giả
const movies = [
    {
        id: 1,
        title: "Phim 1",
        schedule: "10/12/24 - 15/12/24",
        status: "nowShowing",
    },
    {
        id: 2,
        title: "Phim 2",
        schedule: "",
        status: "upcoming",
    },
    {
        id: 3,
        title: "Phim 3",
        schedule: "01/11/24 - 05/11/24",
        status: "finished",
    },
];

const renderTable = (data) => {
    const tableBody = document.getElementById("schedule-table-body");
    tableBody.innerHTML = ""; // Xóa nội dung cũ
    data.forEach((movie) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.schedule || "Không có dữ liệu"}</td>
            <td>${movie.status === "upcoming" ? "Sắp chiếu" : movie.status === "nowShowing" ? "Đang chiếu" : "Đã hết chiếu"}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteMovie(${movie.id})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Xử lý tìm kiếm
document.getElementById("search-button").addEventListener("click", () => {
    const searchValue = document.getElementById("search-input").value.toLowerCase().trim();
    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchValue));
    renderTable(filteredMovies);
});

// Xử lý chỉnh sửa
function editMovie(id) {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
        // Điền dữ liệu vào Modal
        document.getElementById("movieTitle").value = movie.title;
        document.getElementById("movieSchedule").value = movie.schedule || "";

        // Lưu ID phim đang chỉnh sửa
        document.getElementById("saveScheduleButton").dataset.movieId = id;

        // Hiển thị Modal
        const editScheduleModal = new bootstrap.Modal(document.getElementById("editScheduleModal"));
        editScheduleModal.show();
    }
}

document.getElementById("saveScheduleButton").addEventListener("click", () => {
    const movieId = document.getElementById("saveScheduleButton").dataset.movieId;
    const newSchedule = document.getElementById("movieSchedule").value;

    if (newSchedule) {
        const movie = movies.find((m) => m.id == movieId);
        if (movie) {
            movie.schedule = newSchedule;
            alert("Cập nhật thành công!");
            renderTable(movies);

            // Ẩn Modal
            const editScheduleModal = bootstrap.Modal.getInstance(document.getElementById("editScheduleModal"));
            editScheduleModal.hide();
        }
    } else {
        alert("Vui lòng nhập lịch chiếu hợp lệ.");
    }
});


// Hiển thị mặc định
renderTable(movies);

 // Mock data for movies and theaters
 const movie = [
    { id: 1, title: "Phim 1" },
    { id: 2, title: "Phim 2" },
    { id: 3, title: "Phim 3" }
];
const theaters = [
    { id: 1, name: "Rạp 1" },
    { id: 2, name: "Rạp 2" },
    { id: 3, name: "Rạp 3" }
];

// Function to render the dropdown options
function renderDropdowns() {
    const movieSelect = document.getElementById("movieSelect");
    const theaterSelect = document.getElementById("theaterSelect");

    movies.forEach(movie => {
        const option = document.createElement("option");
        option.value = movie.id;
        option.textContent = movie.title;
        movieSelect.appendChild(option);
    });

    theaters.forEach(theater => {
        const option = document.createElement("option");
        option.value = theater.id;
        option.textContent = theater.name;
        theaterSelect.appendChild(option);
    });
}

// Function to ensure the selected date is after today
function validateEndDate() {
    const endDateInput = document.getElementById("endDate");
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    endDateInput.min = today; // Set the minimum selectable date to today
}

// Initialize dropdowns and date validation
renderDropdowns();
validateEndDate();
