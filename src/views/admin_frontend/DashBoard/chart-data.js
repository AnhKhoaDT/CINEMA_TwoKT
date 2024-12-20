// Dữ liệu biểu đồ cột - Top 5 Phim
const movieChartData = {
    type: 'bar',
    data: {
        labels: ['Phim A', 'Phim B', 'Phim C', 'Phim D', 'Phim E'], // Tên các phim
        datasets: [{
            label: 'Lượt xem',
            data: [1200, 900, 750, 600, 450], // Số lượt xem
            backgroundColor: '#0d6efd',
            borderColor: '#0d6efd',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Dữ liệu biểu đồ đường - Doanh thu 5 tháng
const revenueChartData = {
    type: 'line',
    data: {
        labels: ['1/2021', '2/2021', '3/2021', '4/2021', '5/2021'], // Các tháng
        datasets: [{
            label: 'Doanh thu (VND)',
            data: [1200000, 1500000, 1800000, 1600000, 1826000], // Doanh thu 5 tháng gần nhất
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Khởi tạo các biểu đồ khi tài liệu đã được tải
window.onload = function() {
    const movieChartCtx = document.getElementById('movieChart').getContext('2d');
    const movieChart = new Chart(movieChartCtx, movieChartData);

    const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueChartCtx, revenueChartData);
}
