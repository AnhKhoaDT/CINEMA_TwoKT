// Mock data cho dropdown và suất chiếu
const cinemas = [
    { id: "rap1", name: "Rạp Galaxy Nguyễn Du" },
    { id: "rap2", name: "Rạp CGV Lê Văn Sỹ" },
    { id: "rap3", name: "Rạp BHD Phạm Ngọc Thạch" },
];

const rooms = {
    rap1: ["Phòng 1", "Phòng 2", "Phòng 3"],
    rap2: ["Phòng A", "Phòng B"],
    rap3: ["Phòng X", "Phòng Y", "Phòng Z"],
};

const movies = [
    { id: "phimA", name: "Avengers: Endgame" },
    { id: "phimB", name: "Spider-Man: No Way Home" },
    { id: "phimC", name: "The Batman" },
];

const showtimeData = [
    { movie: "Avengers: Endgame", time: "10:00 - 12:00" },
    { movie: "Spider-Man: No Way Home", time: "13:00 - 15:00" },
    { movie: "The Batman", time: "16:00 - 18:00" },
];

// Hàm tính trạng thái "Sắp chiếu", "Đang chiếu", "Đã chiếu"
function getStatus(timeRange) {
    const [startTime, endTime] = timeRange.split(" - ").map(t => {
        const [hours, minutes] = t.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    });

    const now = new Date();
    if (now < startTime) return "Sắp chiếu";
    if (now >= startTime && now <= endTime) return "Đang chiếu";
    return "Đã chiếu";
}

// Render mockdata vào dropdown "Chọn rạp"
const cinemaSelect = document.getElementById("selectCinema");
cinemas.forEach(cinema => {
    const option = document.createElement("option");
    option.value = cinema.id;
    option.textContent = cinema.name;
    cinemaSelect.appendChild(option);
});

// Render mockdata vào dropdown "Chọn phòng chiếu" khi chọn rạp
const roomSelect = document.getElementById("selectRoom");
cinemaSelect.addEventListener("change", () => {
    const selectedCinema = cinemaSelect.value;
    roomSelect.innerHTML = ""; // Xóa các phòng cũ
    rooms[selectedCinema]?.forEach(room => {
        const option = document.createElement("option");
        option.value = room;
        option.textContent = room;
        roomSelect.appendChild(option);
    });
});

// Render mockdata vào bảng danh sách suất chiếu
const scheduleList = document.getElementById("scheduleList");
function renderSchedule(data) {
    scheduleList.innerHTML = ""; // Xóa các dòng cũ
    data.forEach(item => {
        const row = document.createElement("tr");

        // Cột tên phim
        const movieCell = document.createElement("td");
        movieCell.textContent = item.movie;
        row.appendChild(movieCell);

        // Cột thời gian chiếu
        const timeCell = document.createElement("td");
        timeCell.textContent = item.time;
        row.appendChild(timeCell);

        // Cột tình trạng
        const statusCell = document.createElement("td");
        const status = getStatus(item.time); // Tính trạng thái
        statusCell.textContent = status;
        statusCell.classList.add(
            status === "Sắp chiếu" ? "text-primary" :
            status === "Đang chiếu" ? "text-success" :
            "text-secondary"
        );
        row.appendChild(statusCell);

        // Cột hành động
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Xóa";
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", "#deleteModal");
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        scheduleList.appendChild(row);
    });
}
renderSchedule(showtimeData);

// Render mockdata vào dropdown "Chọn phim" trong modal thêm suất chiếu
const movieSelect = document.getElementById("movieSelect");
movies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = movie.name;
    movieSelect.appendChild(option);
});

// Cập nhật thông tin hiển thị thông báo sau khi chọn rạp, phòng, ngày
document.getElementById("confirmSelection").addEventListener("click", () => {
    const selectedCinema = cinemas.find(cinema => cinema.id === cinemaSelect.value)?.name || "Chưa chọn rạp";
    const selectedRoom = roomSelect.value || "Chưa chọn phòng";
    const selectedDate = document.getElementById("selectDate").value || "Chưa chọn ngày";

    document.getElementById("showDate").textContent = `Lịch chiếu ngày: ${selectedDate}`;
    document.getElementById("showRoom").textContent = `Phòng chiếu ${selectedRoom} tại rạp ${selectedCinema}`;
});
