document.getElementById("add-movie-form").addEventListener("submit", async function (event) {
    // Ngăn chặn hành vi mặc định của form
    event.preventDefault();

    // Thu thập dữ liệu từ form
    const formData = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        duration: parseInt(document.getElementById("duration").value, 10),
        nation: document.getElementById("nation").value,
        details: {
            director: document.getElementById("director").value,
            cast: document.getElementById("cast").value,
            releaseDate: document.getElementById("releaseDate").value,
        },
        ageRestriction: parseInt(document.getElementById("ageRestriction").value, 10),
        synopsis: document.getElementById("synopsis").value,
        poster: document.getElementById("poster").value,
        status: document.getElementById("status").value,
        trailer: document.getElementById("trailer").value,
    };

    try {
        // Gửi yêu cầu POST tới server
        const response = await axios.post("/movies/", formData);

        // Xử lý phản hồi từ server
        if (response.status === 201) {
            alert("Thêm phim thành công!");
            document.getElementById("add-movie-form").reset(); // Reset form
            window.location.href = "/list-movie"; // Chuyển hướng tới danh sách phim
        } else {
            throw new Error("Lỗi không xác định.");
        }
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.response ? error.response.data : error.message);
        alert("Đã xảy ra lỗi: " + (error.response ? error.response.data.message : error.message));
    }
});
