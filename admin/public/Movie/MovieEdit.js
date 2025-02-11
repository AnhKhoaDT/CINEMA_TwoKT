document.getElementById("edit-movie-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const movieId = document.getElementById("movie-id").value; // Lấy ID phim từ input ẩn

    // Thu thập dữ liệu từ form
    const updatedMovie = {
        title: document.getElementById("edit-title").value,
        genre: document.getElementById("edit-genre").value,
        duration: parseInt(document.getElementById("edit-duration").value, 10),
        nation: document.getElementById("edit-nation").value,
        details: {
            director: document.getElementById("edit-director").value,
            cast: document.getElementById("edit-cast").value,
            releaseDate: document.getElementById("edit-releaseDate").value,
        },
        ageRestriction: parseInt(document.getElementById("edit-ageRestriction").value, 10),
        synopsis: document.getElementById("edit-synopsis").value,
        poster: document.getElementById("edit-poster").value,
        status: document.getElementById("status").value,
        trailer: document.getElementById("edit-trailer").value,
    };

    try {
        // Gửi yêu cầu PUT đến API
        const response = await axios.put(`/movies/edit/${movieId}`, updatedMovie);

        alert("Cập nhật thành công!");
        console.log("Phim đã được cập nhật:", response.data);

        // Chuyển hướng về trang danh sách phim
        window.location.href = "/list-movie";
    } catch (error) {
        console.error("Lỗi khi cập nhật phim:", error.response ? error.response.data : error.message);
        alert("Đã xảy ra lỗi khi cập nhật phim! " + (error.response ? error.response.data.message : ""));
    }
});




