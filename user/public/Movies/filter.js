$(document).ready(function () {
  const searchBar = $("#search-bar");
  const searchButton = $("#search-button");
  const filterButton = $("#filter-button");
  const filterGenre = $("#filter-genre");
  const filterRating = $("#filter-rating");
  const filterStatus = $("#filter-status");
  const filterAge = $("#filter-age");
  const movieList = $(".movie-list");
  const currentPageElement = $("#current-page");
  const totalPagesElement = $("#total-pages");
  const loadingSpinner = $(".loading-spinner");

  let currentPage = 1; // Sửa thành let để có thể thay đổi giá trị
  let totalPages = 1;
  const limit = 8;
  let isLoading = false; // Đổi từ const sang let

  // Hàm gửi yêu cầu tìm kiếm và lọc
  function loadMovies() {
    if (isLoading) return;
    isLoading = true;
    loadingSpinner.show();

    const params = {
      search: searchBar.val(), // Từ khóa tìm kiếm
      genre: filterGenre.val() !== "all" ? filterGenre.val() : "",
      rating: filterRating.val() !== "all" ? filterRating.val() : "",
      status: filterStatus.val() !== "all" ? filterStatus.val() : "",
      age: filterAge.val() !== "all" ? filterAge.val() : "",
      page: currentPage, // Trang hiện tại
      limit, // Số lượng phim mỗi trang
    };

    // Gửi yêu cầu AJAX
    $.ajax({
      url: "/movies/query", // Endpoint API
      method: "GET",
      data: params,
      success: function (response) {
        const moviesData = response.movies || {};
        const movies = moviesData.movies || [];
        totalPages = moviesData.totalPages || 1;
        currentPage = moviesData.page || 1;

        movieList.empty();
        if (movies.length === 0) {
          movieList.append(`
                        <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100%; 
                            font-size: 18px;
                            text-align: center;
                        ">
                            Không có phim nào để hiển thị.
                        </div>
                    `);
        } else {
          movies.forEach((movie) => {
            const movieCard = `
                            <div class="movie-card">
                                <div class="film-list">
                                    <img src="${
                                      movie.poster || "default-image.jpg"
                                    }" alt="${
              movie.title || "Unknown Movie"
            }" />
                                    <div class="overlay-list">
                                        <p><i class="bi bi-tags" style="color: yellow;"></i> ${
                                          movie.genre
                                        }</p>
                                        <p><i class="bi bi-clock" style="color: yellow;"></i> ${
                                          movie.duration
                                        } phút</p>
                                        <p><i class="bi bi-globe-americas" style="color: yellow;"></i> ${
                                          movie.nation
                                        }</p>
                                    </div>
                                </div>
                                <div class="title">${movie.title}</div>
                                <div class="actions">
                                    <a href="${
                                      movie.trailer
                                    }"><i class="bi bi-play-circle-fill" style="margin-right: 5px;"></i>Xem Trailer</a>
                                    <button>Đặt Vé</button>
                                </div>
                            </div>
                        `;
            movieList.append(movieCard);
          });
        }
        currentPageElement.text(currentPage);
        totalPagesElement.text(totalPages);
        searchBar.val("");
      },
      error: function (error) {
        console.error("Error loading movies:", error);
      },
      complete: function () {
        loadingSpinner.hide();
        isLoading = false;
      },
    });
  }

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
    loadMovies();
  }
  // Kích hoạt tìm kiếm khi nhấn vào icon kính lúp
  searchButton.on("click", function () {
    loadMovies();
  });

  // Kích hoạt tìm kiếm khi nhấn Enter trong ô tìm kiếm
  searchBar.on("keypress", function (e) {
    if (e.which === 13) {
      // Phím Enter
      loadMovies();
    }
  });

  // Kích hoạt lọc khi nhấn nút Filter
  filterButton.on("click", loadMovies);

  // Lắng nghe sự kiện click trên các nút phân trang
  $(".pagination-button").on("click", function () {
    const action = $(this).data("action"); // Lấy hành động từ nút (first, prev, next, last)
    handlePagination(action); // Gọi hàm xử lý phân trang
  });

  // Tải danh sách phim khi trang được tải lần đầu
  loadMovies();
});
