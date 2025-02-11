function renderTable(movies) {
    console.log("Rendering movies:", movies); // Log danh sách phim

    const tbody = document.getElementById("movie-list");
    tbody.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

    if (!movies || movies.length === 0) {
        // Nếu không có dữ liệu
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>`;
        return;
    }

    movies.forEach(movie => {
        const row = document.createElement("tr");

        // Kiểm tra và gán giá trị cho từng cột, nếu không có thì hiển thị "Không có dữ liệu"
        const title = movie.title || "Không có dữ liệu";
        const releaseDate = movie.details?.releaseDate
            ? new Date(movie.details.releaseDate).toLocaleDateString()
            : "Không có dữ liệu";
        const genre = movie.genre || "Không có dữ liệu";
        const createdAt = movie.createdAt
            ? new Date(movie.createdAt).toLocaleDateString()
            : "Không có dữ liệu";

        row.innerHTML = `
            <td>${title}</td>
            <td>${releaseDate}</td>
            <td>${genre}</td>
            <td>${createdAt}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editMovie('${movie._id || ''}')">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteMovie('${movie._id || ''}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


// Hàm chỉnh sửa phim
function editMovie(movieId) {
    if (!movieId) {
        console.error("ID của phim không tồn tại!");
        return;
    }

    // Chuyển hướng đến trang chỉnh sửa
    window.location.href = `/edit/${movieId}`;
}

function deleteMovie(movieId) {
    if (!movieId) {
        console.error("ID của phim không tồn tại!");
        return;
    }

    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (!confirmDelete) return;

    axios.delete(`/movies/delete/${movieId}`)
        .then(response => {
            alert(response.data.message || "Xóa phim thành công!");
            window.location.reload();
        })
        .catch(error => {
            console.error("Lỗi khi xóa phim:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Đã xảy ra lỗi khi xóa phim!");
        });
}


// Hàm tải dữ liệu từ server
async function fetchMovies(page = 1, filters = {}) {
    try {
        const query = new URLSearchParams({
            page,
            ...filters,
        });

        const response = await fetch(`/movies/query?${query.toString()}`);
        const data = await response.json();

        // Dữ liệu thực sự là data.movies.movies
        const movies = data.movies.movies || [];
        const totalPages = data.movies.totalPages || 1;
        const currentPage = data.movies.page || 1;

        console.log("Movies data received:", movies);

        renderTable(movies); // Truyền mảng movies vào hàm renderTable
        updatePagination(currentPage, totalPages);
    } catch (error) {
        console.error("Lỗi khi tải danh sách phim:", error);
    }
}

// Hàm cập nhật giao diện phân trang
function updatePagination(page, totalPages) {
    const prevButton = document.querySelector(".btn-secondary.me-2");
    const nextButton = document.querySelector(".btn-secondary.ms-2");
    const firstButton = document.querySelector(".pagination-button[data-action='first']");
    const lastButton = document.querySelector(".pagination-button[data-action='last']");

    firstButton.disabled = page === 1;
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
    lastButton.disabled = page === totalPages;

    document.getElementById("current-page").textContent = page;
    document.getElementById("total-pages").textContent = totalPages;

    firstButton.onclick = () => fetchMovies(1);
    prevButton.onclick = () => fetchMovies(page - 1);
    nextButton.onclick = () => fetchMovies(page + 1);
    lastButton.onclick = () => fetchMovies(totalPages);
}

let currentPage = 1; // Lưu trữ trang hiện tại
let totalPages = 1; 

// Hàm xử lý phân trang
function handlePagination(action) {
    if (action === "first") {
      currentPage = 1;
    } else if (action === "prev" && currentPage > 1) {
      currentPage--;
    } else if (action === "next" && currentPage < totalPages) {
      currentPage++;
    } else if (action === "last") {
      currentPage = totalPages;
    }

    // Tải lại dữ liệu
    fetchMovies(1);
}
// Lắng nghe sự kiện click trên các nút phân trang
document.querySelectorAll(".pagination-button").forEach((button) => {
    button.addEventListener("click", function () {
        const action = this.getAttribute("data-action"); // Lấy hành động từ thuộc tính data-action
        handlePagination(action); // Gọi hàm xử lý phân trang
    });
});

// Tìm kiếm phim
document.getElementById("search-button").addEventListener("click", () => {
    const searchValue = document.getElementById("search-movie").value;
    fetchMovies(1, { search: searchValue });
});



// Tải dữ liệu trang đầu tiên khi trang được tải
fetchMovies(1);
