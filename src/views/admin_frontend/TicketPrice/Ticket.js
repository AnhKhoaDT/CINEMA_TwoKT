function updatePrice(seatType) {
    let price = seatType === 'single' ? document.getElementById('singleSeatPrice').value : document.getElementById('doubleSeatPrice').value;
    
    // Chuyển đổi giá trị thành tiền tệ VNĐ
    let formattedPrice = formatCurrency(price);

    // Gọi API để cập nhật giá vé trên server
    let apiEndpoint = '/api/update-seat-price'; // Đổi thành endpoint phù hợp với API backend khi có
    let requestData = {
        seatType: seatType,
        price: formattedPrice.replace(/[^0-9]/g, '') // Lấy số nguyên từ giá
    };

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Giá vé ghế ${seatType === 'single' ? 'đơn' : 'đôi'} đã được cập nhật thành công.`);
        } else {
            alert('Có lỗi xảy ra khi cập nhật giá vé.');
        }
    })
    .catch(error => {
        console.error('Lỗi API:', error);
        alert('Không thể cập nhật giá vé, vui lòng thử lại sau.');
    });
}

function formatCurrency(amount) {
    // Chuyển đổi giá trị thành tiền tệ VNĐ
    let number = parseFloat(amount.replace(/,/g, '').trim());
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
