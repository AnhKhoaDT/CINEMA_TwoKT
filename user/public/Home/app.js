$(document).ready(() => {
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
        $('#nav-menu-second').toggleClass('active')
       
    })

    // setting owl carousel

    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('#hero-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav:true,
        navText: navText,
        autoplay: true,
        autoplayHoverPause: true
    })

    $('#top-movies-slide').owlCarousel({
        items: 2,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            500: {
                items: 3
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    })

    $('.movies-slide').owlCarousel({
        items: 2,
        dots: false,
        nav:true,
        navText: navText,
        margin: 15,
        responsive: {
            500: {
                items: 2
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    
    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
            if (!confirmLogout) {
                return; // Nếu người dùng không xác nhận, thoát hàm
            }

            try {
                // Gửi yêu cầu đăng xuất
                const response = await axios.get("/api/auth/logout", { withCredentials: true });
                alert("Đăng xuất thành công!");
                console.log(response.data.message);

                // Chuyển hướng đến trang đăng nhập
                window.location.href = "/auth/login";
            } catch (error) {
                console.error("Lỗi khi đăng xuất:", error.response?.data || error.message);
                alert("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
            }
        });
    }
});

  

  document.cookie.split(";").forEach((cookie) => {
    if (cookie.trim().startsWith("connect.sid=")) {
      console.log("Cookie connect.sid:", cookie.trim());
    }
  });
// JavaScript cách
document.getElementById("userMenuButton").addEventListener("click", function () {
    const userMenu = document.getElementById("userMenu");
    userMenu.classList.toggle("hidden");
});