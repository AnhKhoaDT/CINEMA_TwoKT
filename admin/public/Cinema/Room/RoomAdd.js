// Hàm tạo danh sách ghế
function generateSeats(rowData) {
    const seats = [];
    const seatTypeClass = rowData.seatType === 'single' ? 'bg-danger' : 'bg-primary';

    for (let i = 1; i <= rowData.seatCount; i++) {
        seats.push(`
            <span class="seat ${seatTypeClass} text-white p-1">
                ${rowData.rowLetter}${i}
            </span>
        `);
    }
    return seats.join('');
}

// Xử lý khi xác nhận số hàng ghế
document.getElementById('confirmRowsBtn').addEventListener('click', () => {
    const rowCount = parseInt(document.getElementById('numRows').value);
    if (!rowCount || rowCount <= 0) {
        alert('Vui lòng nhập số hàng ghế hợp lệ!');
        return;
    }

    const rowList = document.getElementById('seat-row-list');
    rowList.innerHTML = ''; // Xóa các hàng trước đó

    for (let i = 0; i < rowCount; i++) {
        const rowLetter = String.fromCharCode(65 + i); // Tạo tên hàng ghế A, B, C...
        const rowData = { rowLetter, seatCount: 0, seatType: 'single' }; // Dữ liệu hàng ghế mặc định

        const listItem = document.createElement('div');
        listItem.className = 'd-flex justify-content-between align-items-center seat-row';
        listItem.innerHTML = `
            <span>Hàng ${rowLetter}</span>
            <div class="seat-preview mt-2 d-flex flex-wrap gap-1" id="row${rowLetter}">
                ${generateSeats(rowData)}
            </div>
            <button class="btn btn-outline-primary btn-sm edit-row" data-row="${rowLetter}">
                <i class="bi bi-pencil"></i> Chỉnh sửa
            </button>
        `;
        rowList.appendChild(listItem);
    }

    document.getElementById('seat-edit-container').style.display = 'block';
});

// Hiển thị modal chỉnh sửa ghế
document.getElementById('seat-row-list').addEventListener('click', (event) => {
    if (event.target.closest('.edit-row')) {
        const rowLetter = event.target.closest('.edit-row').getAttribute('data-row');
        document.getElementById('currentRow').value = rowLetter; // Hiển thị tên hàng ghế trong modal
        document.getElementById('seatCount').value = '';  // Xóa số ghế cũ
        document.querySelector('[name="seatType"][value="single"]').checked = true; // Chọn ghế đơn mặc định

        // Hiển thị modal
        const modalInstance = new bootstrap.Modal(document.getElementById('seatModal'));
        modalInstance.show();
    }
});

// Lưu thông tin ghế đã chỉnh sửa
document.getElementById('saveSeatsBtn').addEventListener('click', () => {
    const rowLetter = document.getElementById('currentRow').value.trim();  // Lấy tên hàng ghế
    const seatCount = parseInt(document.getElementById('seatCount').value.trim()); // Lấy số ghế
    const seatType = document.querySelector('[name="seatType"]:checked').value; // Lấy loại ghế

    // Kiểm tra số ghế hợp lệ
    if (!seatCount || seatCount <= 0 || seatCount > 20) {
        alert('Vui lòng nhập số ghế từ 1 đến 20!');
        return;
    }

    // Cập nhật ghế trong hàng
    const rowElement = document.getElementById(`row${rowLetter}`);
    if (!rowElement) {
        alert(`Không tìm thấy hàng ghế: ${rowLetter}`);
        return;
    }

    // Tạo danh sách ghế mới
    const rowData = { rowLetter, seatCount, seatType };
    rowElement.innerHTML = generateSeats(rowData);

    // Đóng modal
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('seatModal'));
    if (modalInstance) {
        modalInstance.hide();
    }
});

// Thêm phòng chiếu
document.getElementById('addRoomBtn').addEventListener('click', () => {
    const roomName = document.getElementById('roomName').value.trim();
    if (!roomName) {
        alert('Vui lòng nhập tên phòng chiếu!');
        return;
    }

    alert(`Phòng chiếu "${roomName}" đã được thêm thành công!`);
});

