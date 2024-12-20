// Dữ liệu mẫu
const movies = [
    { id: 1, title: "Phim A", releaseDate: "2024-01-01", genre: "Hành động", addedDate: "2024-12-08" },
    { id: 2, title: "Phim B", releaseDate: "2024-02-15", genre: "Hài", addedDate: "2024-12-07" },
    { id: 3, title: "Phim C", releaseDate: "2023-11-10", genre: "Tình cảm", addedDate: "2024-12-06" },
];

// Hàm render bảng
function renderTable(movies) {
    const tbody = document.getElementById("movie-list");
    tbody.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

    movies.forEach(movie => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.releaseDate}</td>
            <td>${movie.genre}</td>
            <td>${movie.addedDate}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editMovie(${movie.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm tìm kiếm
document.getElementById("search-button").addEventListener("click", () => {
    const searchValue = document.getElementById("search-input").value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchValue));
    renderTable(filteredMovies);
});

// Hiển thị dữ liệu mẫu khi trang tải
renderTable(movies);
