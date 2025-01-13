

document.addEventListener("DOMContentLoaded", function() {
    fetch('./assets/pay.json')
      .then(response => response.json())
      .then(data => {
        // Lấy dữ liệu từ file JSON và gán vào các phần tử HTML
        const cinema = data.cinema;
        const snack = data.snack;
        const totalAmount = data.totalAmount;
  
        document.getElementById("cinema-name").innerText = cinema.name;
        document.getElementById("cinema-address").innerText = cinema.address;
        document.getElementById("snack-name").innerText = snack.name;
        document.getElementById("snack-quantity").innerText = snack.quantity;
        document.getElementById("total-amount").innerText = totalAmount;
      })
      .catch(error => console.error('Error loading JSON:', error));
  
    // Xử lý sự kiện thanh toán
    document.getElementById("payment-btn").addEventListener("click", function() {
      console.log("Thanh toán đã được xác nhận");
    });
  });
  