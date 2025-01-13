document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các nút + và -
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const quantities = document.querySelectorAll('.quantity');
    const prices = document.querySelectorAll('.price');
    const totalPriceElement = document.getElementById('total-price');

    // Hàm tính tổng tiền
    function calculateTotal() {
        let total = 0;

        // Duyệt qua từng sản phẩm (đồ ăn và đồ uống)
        quantities.forEach((quantityElement, index) => {
            const quantity = parseInt(quantityElement.textContent);
            const price = parseInt(prices[index].textContent.replace(' VNĐ', '').replace('.', ''));
            total += quantity * price;
        });

        // Cập nhật tổng tiền
        totalPriceElement.textContent = `Tổng cộng: ${total.toLocaleString()} VNĐ`;
    }

    // Hàm cập nhật số lượng khi nhấn nút +
    function increaseQuantity(index) {
        let quantity = parseInt(quantities[index].textContent);
        quantity++;
        quantities[index].textContent = quantity;
        calculateTotal();
    }

    // Hàm cập nhật số lượng khi nhấn nút -
    function decreaseQuantity(index) {
        let quantity = parseInt(quantities[index].textContent);
        if (quantity > 0) {
            quantity--;
        }
        quantities[index].textContent = quantity;
        calculateTotal();
    }

    // Gán sự kiện cho tất cả các nút increase và decrease
    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => increaseQuantity(index));
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => decreaseQuantity(index));
    });
});

