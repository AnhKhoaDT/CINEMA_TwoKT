// Data mẫu
const movieData = {
    title: "Phim A",
    releaseDate: "2024-01-01",
    genre: "Hành động",
    duration: "120",
    director: "Đạo diễn A",
    cast: "Diễn viên 1, Diễn viên 2",
    synopsis: "Tóm tắt nội dung phim A",
    poster: "https://example.com/poster.jpg",
    trailer: "https://example.com/trailer.mp4",
    ageRestriction: "PG-13",
    nation: "Việt Nam" // Thêm trường quốc gia
};

// Điền dữ liệu vào form
document.getElementById("edit-title").value = movieData.title;
document.getElementById("edit-releaseDate").value = movieData.releaseDate;
document.getElementById("edit-genre").value = movieData.genre;
document.getElementById("edit-duration").value = movieData.duration;
document.getElementById("edit-director").value = movieData.director;
document.getElementById("edit-cast").value = movieData.cast;
document.getElementById("edit-synopsis").value = movieData.synopsis;
document.getElementById("edit-poster").value = movieData.poster;
document.getElementById("edit-trailer").value = movieData.trailer;
document.getElementById("edit-ageRestriction").value = movieData.ageRestriction;
document.getElementById("edit-nation").value = movieData.nation;

// Xử lý sự kiện submit
document.getElementById("edit-movie-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedMovie = {
        title: document.getElementById("edit-title").value,
        releaseDate: document.getElementById("edit-releaseDate").value,
        genre: document.getElementById("edit-genre").value,
        duration: document.getElementById("edit-duration").value,
        director: document.getElementById("edit-director").value,
        cast: document.getElementById("edit-cast").value,
        synopsis: document.getElementById("edit-synopsis").value,
        poster: document.getElementById("edit-poster").value,
        trailer: document.getElementById("edit-trailer").value,
        ageRestriction: document.getElementById("edit-ageRestriction").value,
        nation: document.getElementById("edit-nation").value
    };

    console.log("Cập nhật phim:", updatedMovie);
    // Thực hiện gọi API hoặc cập nhật dữ liệu
});
