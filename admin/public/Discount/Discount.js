// Mock data
const mockPromotions = [
    {
      discount_id: 1,
      description: "Giảm 20% cho hóa đơn trên 500K",
      discount_code: "SAVE20",
      valid_from: "2024-12-01",
      valid_until: "2024-12-31",
      discount_percentage: 20,
      target: "Giá vé", // Thêm đối tượng giảm giá
      type: "percent", // Thêm loại giảm giá
      value: 20 // Thêm giá trị giảm
    },
    {
      discount_id: 2,
      description: "Giảm 50K khi mua 2 vé xem phim",
      discount_code: "MOVIE50",
      valid_from: "2024-11-15",
      valid_until: "2024-12-15",
      discount_percentage: 10,
      target: "Combo",
      type: "fixed",
      value: 50
    },
    {
      discount_id: 3,
      description: "Giảm 30% cho khách hàng VIP",
      discount_code: "VIP30",
      valid_from: "2024-11-01",
      valid_until: "2024-12-31",
      discount_percentage: 30,
      target: "Đồ uống",
      type: "percent",
      value: 30
    },
    {
      discount_id: 4,
      description: "Giảm giá đặc biệt cuối năm",
      discount_code: null,
      valid_from: "2024-12-20",
      valid_until: "2025-01-01",
      discount_percentage: 25,
      target: "Đồ ăn",
      type: "percent",
      value: 25
    }
  ];
  
  // Render promotions
  function renderPromotions() {
    const promoTableBody = document.getElementById("promoTableBody");
    promoTableBody.innerHTML = mockPromotions
      .map(
        (promo) => `
          <tr>
              <td>${promo.discount_id}</td>
              <td>${promo.description}</td>
              <td>${promo.discount_code || "-"}</td>
              <td>${promo.target}</td> <!-- Hiển thị đối tượng -->
              <td>${promo.type === 'percent' ? 'Giảm theo %' : 'Giảm theo số tiền'}</td> <!-- Hiển thị loại giảm giá -->
              <td>${promo.value}</td> <!-- Hiển thị giá trị giảm -->
              <td>${promo.valid_from}</td>
              <td>${promo.valid_until}</td>
              <td>
                  <button class="btn btn-danger btn-sm delete-btn" data-id="${promo.discount_id}" data-bs-toggle="modal" data-bs-target="#deletePromoModal">Xóa</button>
              </td>
          </tr>
      `
      )
      .join("");
  }
  
  // Gọi hàm render bảng khi load trang
  document.addEventListener("DOMContentLoaded", renderPromotions);
  
  // Hiển thị modal thêm khuyến mãi
  document.getElementById("addPromoBtn").addEventListener("click", () => {
    const addPromoModal = new bootstrap.Modal(document.getElementById("addPromoModal"));
    addPromoModal.show();
  });
  
  // Lưu khuyến mãi (hiện tại chỉ console.log dữ liệu)
  document.getElementById("savePromoBtn").addEventListener("click", () => {
    const newPromo = {
      description: document.getElementById("promoDetail").value,
      discount_code: document.getElementById("promoCode").value || null,
      valid_from: document.getElementById("promoStart").value,
      valid_until: document.getElementById("promoEnd").value,
      target: document.getElementById("promoTarget").value,
      type: document.getElementById("promoType").value,
      value: document.getElementById("promoValue").value
    };
  
    console.log("Khuyến mãi mới:", newPromo);
  
    // Đóng modal sau khi lưu
    const addPromoModal = bootstrap.Modal.getInstance(document.getElementById("addPromoModal"));
    addPromoModal.hide();
  });
  
  let promoToDelete = null;
  
  // Hiển thị modal xóa khuyến mãi
  document.getElementById("promoTableBody").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      promoToDelete = e.target.getAttribute("data-id");
      console.log("Khuyến mãi cần xóa:", promoToDelete);
    }
  });
  
  // Xác nhận xóa khuyến mãi (hiện tại chỉ console.log ID)
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    console.log("Xóa khuyến mãi ID:", promoToDelete);
  
    // Đóng modal sau khi xác nhận
    const deletePromoModal = bootstrap.Modal.getInstance(document.getElementById("deletePromoModal"));
    deletePromoModal.hide();
  });
  