function renderCinemaTable(cinemas) {
    console.log("Rendering cinemas:", cinemas); // Log danh sách rạp

    const tbody = document.getElementById("cinema-list");
    tbody.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

    if (!cinemas || cinemas.length === 0) {
        // Nếu không có dữ liệu
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>`;
        return;
    }

    cinemas.forEach(cinema => {
        const row = document.createElement("tr");

        // Kiểm tra và gán giá trị cho từng cột, nếu không có thì hiển thị "Không có dữ liệu"
        const name = cinema.name || "Không có dữ liệu";
        const address = cinema.address || "Không có dữ liệu";7
        const phone = cinema.contact?.phone || "Không có dữ liệu";
        const email = cinema.contact?.email || "Không có dữ liệu";

        row.innerHTML = `
            <td>${name}</td>
            <td>${address}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>
                <button class="btn btn-outline-secondary btn-sm" onclick="handleAction('${cinema._id || ""}')">
                    <i class="bi bi-three-dots"></i>
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}


document.getElementById("add-cinema-form").addEventListener("submit", async function (event) {
    // Ngăn chặn hành vi mặc định của form
    event.preventDefault();

    // Thu thập dữ liệu từ form
    const formData = {
        name: document.getElementById("cinema-name").value,
        address: document.getElementById("cinema-address").value,
        contact: {
            phone: document.getElementById("cinema-phone").value,
            email: document.getElementById("cinema-email").value,
        },
    };

    try {
        // Gửi yêu cầu POST tới server
        const response = await axios.post("/cinemas", formData);

        // Xử lý phản hồi từ server
        if (response.status === 201) {
            alert("Thêm rạp thành công!");
            document.getElementById("add-cinema-form").reset(); // Reset form
            document.getElementById("addCinemaModal").click(); // Đóng modal
            fetchCinemas(); // Tải lại danh sách rạp
        } else {
            throw new Error("Lỗi không xác định.");
        }
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.response ? error.response.data : error.message);
        alert("Đã xảy ra lỗi: " + (error.response ? error.response.data.message : error.message));
    }
});

// Hàm chi tiết rạp phim
function handleAction(cinemaId) {
    if (!cinemaId) {
        console.error("ID của rạp phim không tồn tại!");
        return;
    }

    // Chuyển hướng đến trang chỉnh sửa
    window.location.href = `/admin-dashboard/cinema/detail/${cinemaId}`;
}

// Hàm tải dữ liệu rạp phim từ server
async function fetchCinemas() {
    try {
        // Gửi yêu cầu GET đến server
        const response = await axios.get('/cinemas'); // Đường dẫn này cần khớp với API của bạn
        const cinemas = response.data.cinemas; // Lấy mảng cinemas từ response.data
        
        // Kiểm tra và hiển thị dữ liệu
        if (cinemas && Array.isArray(cinemas)) {
            renderCinemaTable(cinemas); // Gọi hàm render để hiển thị dữ liệu lên bảng
        } else {
            console.error("Dữ liệu rạp phim không hợp lệ:", cinemas);
            renderCinemaTable([]); // Hiển thị "Không có dữ liệu" nếu dữ liệu không hợp lệ
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu rạp phim từ server:", error);
        renderCinemaTable([]); // Hiển thị "Không có dữ liệu" nếu xảy ra lỗi
    }
}

// Gọi hàm fetchCinemas khi trang được tải
document.addEventListener("DOMContentLoaded", fetchCinemas);
