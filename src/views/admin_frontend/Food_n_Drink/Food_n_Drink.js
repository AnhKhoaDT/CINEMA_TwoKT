// Mock data
const mockFoodDrinks = [
    {
        id: "F001",
        name: "Gà rán",
        image: "path/to/image1.jpg",
        price: 100000
    },
    {
        id: "D003",
        name: "Lý Coca 37oz",
        image: "path/to/image2.jpg",
        price: 35000
    },
    {
        id: "C001",
        name: "Combo 1 Bỏng ngô 1 Coca 30oz",
        image: "path/to/image3.jpg",
        price: 50000
    }
];

// Render food and drink items
function renderFoodDrinks() {
    const tableBody = document.getElementById("foodDrinkTableBody");
    tableBody.innerHTML = mockFoodDrinks
        .map(
            (item) => `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" width="50" /></td>
                <td>${item.price.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#deleteFoodDrinkModal">Xóa</button>
                </td>
            </tr>
        `
        )
        .join("");
}

// Gọi hàm render bảng khi load trang
document.addEventListener("DOMContentLoaded", renderFoodDrinks);

// Hiển thị modal thêm đồ ăn/uống
document.getElementById("addFoodDrinkBtn").addEventListener("click", () => {
    const addFoodDrinkModal = new bootstrap.Modal(document.getElementById("addFoodDrinkModal"));
    addFoodDrinkModal.show();
});

// Lưu đồ ăn/uống (hiện tại chỉ console.log dữ liệu)
document.getElementById("saveFoodDrinkBtn").addEventListener("click", () => {
    const newItem = {
        id: document.getElementById("foodDrinkId").value,
        name: document.getElementById("foodDrinkName").value,
        image: URL.createObjectURL(document.getElementById("foodDrinkImage").files[0]),
        price: parseFloat(document.getElementById("foodDrinkPrice").value)
    };

    console.log("Thêm đồ ăn/uống mới:", newItem);

    // Thêm vào mock data
    mockFoodDrinks.push(newItem);

    // Đóng modal sau khi lưu
    const addFoodDrinkModal = bootstrap.Modal.getInstance(document.getElementById("addFoodDrinkModal"));
    addFoodDrinkModal.hide();

    // Render lại danh sách
    renderFoodDrinks();
});

let foodDrinkToDelete = null;

// Hiển thị modal xóa đồ ăn/uống
document.getElementById("foodDrinkTableBody").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        foodDrinkToDelete = e.target.getAttribute("data-id");
        console.log("Đồ ăn/uống cần xóa:", foodDrinkToDelete);
    }
});

// Xác nhận xóa đồ ăn/uống (hiện tại chỉ console.log ID)
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    console.log("Xóa đồ ăn/uống ID:", foodDrinkToDelete);

    // Xóa item khỏi mock data
    mockFoodDrinks.splice(mockFoodDrinks.findIndex(item => item.id === foodDrinkToDelete), 1);

    // Đóng modal sau khi xác nhận
    const deleteFoodDrinkModal = bootstrap.Modal.getInstance(document.getElementById("deleteFoodDrinkModal"));
    deleteFoodDrinkModal.hide();

    // Render lại danh sách
    renderFoodDrinks();
});
