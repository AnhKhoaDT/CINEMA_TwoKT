
    $(document).ready(function() {
        // Lấy các phần tử filter
        const filterButton = $('#filter-button');
        const filterGenre = $('#filter')[0];
        const filterRating = $('#filter')[1];
        const filterStatus = $('#filter')[2];
        const filterAge = $('#filter')[3];

        const currentPage = 1;

        // Xử lý sự kiện khi nhấn nút "Filter"
        filterButton.on('click', function() {
            const genre = $(filterGenre).val() !== "all" ? $(filterGenre).val() : "";
            const rating = $(filterRating).val() !== "all" ? $(filterRating).val() : "";
            const status = $(filterStatus).val() !== "all" ? $(filterStatus).val() : "";
            const age = $(filterAge).val() !== "all" ? $(filterAge).val() : "";

            // Gửi các tham số tới server và tải lại danh sách phim
            loadMovies({
                genre,
                rating,
                status,
                age,
                page: currentPage,
            });
        });

        // Hàm tải lại phim từ server
        function loadMovies(filters) {
            $.ajax({
                url: '${WEB_URL}/movies/query', // Thay bằng URL API của bạn để lấy dữ liệu phim
                method: 'GET',
                data: filters,
                success: function(response) {
                    // Render lại danh sách phim (hoặc thay thế nội dung)
                    const movieList = $('.movie-list');
                    movieList.empty();
                    
                    if (response.movies.length === 0) {
                        movieList.append('<p>Không có phim nào để hiển thị.</p>');
                    } else {
                        response.movies.forEach(movie => {
                            const movieCard = `
                                <div class="movie-card">
                                    <div class="film-list">
                                        <img src="${movie.poster || 'default-image.jpg'}" alt="${movie.title || 'Unknown Movie'}" />
                                        <div class="overlay-list">
                                            <p><i class="bi bi-tags" style="color: yellow;"></i> ${movie.genre}</p>
                                            <p><i class="bi bi-clock" style="color: yellow;"></i> ${movie.duration} phút</p>
                                            <p><i class="bi bi-globe-americas" style="color: yellow;"></i> ${movie.nation}</p>
                                        </div>
                                    </div>
                                    <div class="title">${movie.title}</div>
                                    <div class="actions">
                                        <a href="${movie.trailer}"><i class="bi bi-play-circle-fill" style="margin-right: 5px;"></i>Xem Trailer</a>
                                        <button>Đặt Vé</button>
                                    </div>
                                </div>
                            `;
                            movieList.append(movieCard);
                        });

                        // Cập nhật số trang và điều chỉnh phân trang
                        $('#current-page').text(response.page);
                        $('#total-pages').text(response.totalPages);
                    }
                },
                error: function(error) {
                    console.error('Error loading movies:', error);
                }
            });
        }

        // Phân trang
        $('.pagination-button').on('click', function() {
            const action = $(this).attr('data-action');
            if (action === 'next') {
                currentPage++;
            } else if (action === 'prev') {
                currentPage--;
            } else if (action === 'first') {
                currentPage = 1;
            } else if (action === 'last') {
                currentPage = $('#total-pages').text();
            }

            // Tải lại phim với trang mới
            loadMovies({
                genre: $(filterGenre).val(),
                rating: $(filterRating).val(),
                status: $(filterStatus).val(),
                age: $(filterAge).val(),
                page: currentPage
            });
        });
    });
