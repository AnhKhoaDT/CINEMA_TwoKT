const seats = document.querySelectorAll('.seat, .seat-duo');
const bookedSeats = ['A01', 'C05', 'H01-02']; // Example booked seats
let selectedSeats = new Set();

seats.forEach(seat => {
    // Check if seat is booked initially
    if (bookedSeats.includes(seat.id)) {
        seat.classList.add('booked');
    }

    seat.addEventListener('click', () => {
        if (seat.classList.contains('booked')) {
            alert('Ghế này đã được đặt!');
            return;
        }
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats.delete(seat.id);
        } else {
            seat.classList.add('selected');
            selectedSeats.add(seat.id);
        }
        console.log("Selected Seats:", selectedSeats); //For debugging purposes.
    });
});

// Lấy tất cả các phần tử vé, đồ ăn và đồ uống
const ticketContainers = document.querySelectorAll('.ticket');
const foodDrinkContainers = document.querySelectorAll('.food-drink');

// Hàm cập nhật tổng tiền
function updateTotal() {
    let totalPrice = 0;

    // Cập nhật tổng tiền cho vé
    ticketContainers.forEach(container => {
        const price = parseInt(container.querySelector('.price').textContent.replace(' VNĐ', '').replace('.', '').trim());
        const quantity = parseInt(container.querySelector('.quantity').textContent);
        totalPrice += price * quantity;
    });

    // Cập nhật tổng tiền cho đồ ăn và đồ uống
    foodDrinkContainers.forEach(container => {
        const price = parseInt(container.querySelector('.price').textContent.replace(' VNĐ', '').replace('.', '').trim());
        const quantity = parseInt(container.querySelector('.quantity').textContent);
        totalPrice += price * quantity;
    });

    // Hiển thị tổng tiền
    document.getElementById('total-price').textContent = `Tổng cộng: ${totalPrice.toLocaleString()} VNĐ`;
}

// Thêm sự kiện cho các nút + và -
function addEventListenersToItems(containers) {
    containers.forEach(container => {
        const decreaseBtn = container.querySelector('.decrease');
        const increaseBtn = container.querySelector('.increase');
        const quantityElement = container.querySelector('.quantity');

        // Giảm số lượng
        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                updateTotal();
            }
        });

        // Tăng số lượng
        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateTotal();
        });
    });
}

// Gọi hàm để thêm sự kiện cho các loại vé, đồ ăn và đồ uống
addEventListenersToItems(ticketContainers);
addEventListenersToItems(foodDrinkContainers);

// Lấy tất cả các nút giờ trong tất cả các div location
const timeButtons = document.querySelectorAll('.LNT-options .time button');

// Thêm sự kiện click cho mỗi nút giờ
timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Kiểm tra nếu nút đã được chọn
        if (button.classList.contains('selected')) {
            // Nếu đã chọn thì bỏ chọn (xóa viền trắng)
            button.classList.remove('selected');
        } else {
            // Nếu chưa chọn, thì xóa viền trắng khỏi tất cả nút
            timeButtons.forEach(btn => btn.classList.remove('selected'));
            // Thêm viền trắng cho nút vừa chọn
            button.classList.add('selected');
        }
    });
});



