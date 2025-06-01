// JS xử lý nút "Có"
const btnCo = document.getElementById("co");
const btnKhong = document.getElementById("khong");
let khongInitialPosition = null;
let isMoving = false;
const hideScrollPosition = 500;

// Lưu vị trí ban đầu của các nút
window.addEventListener('load', () => {
    const khongRect = btnKhong.getBoundingClientRect();
    khongInitialPosition = {
        right: khongRect.right,
        top: khongRect.top
    };
});

btnCo.addEventListener("click", function() {
    Swal.fire({
        title: 'Anh biết mà! 💝',
        text: 'Yêu em nhiều nhiều!',
        imageWidth: 200,
        imageHeight: 200,
        background: 'linear-gradient(45deg, #ffe6ea, #ffb6c1)',
        confirmButtonText: 'Yêu anh 💕',
        confirmButtonColor: '#ff69b4',
        showConfirmButton: true,
        customClass: {
            popup: 'animated heartBeat'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Ẩn phần câu hỏi
            document.querySelector('.love-question').classList.add('hidden');
            
            // Hiện nội dung lần lượt
            const hiddenElements = document.querySelectorAll('.hidden-content');
            hiddenElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('show-content');
                }, index * 300);
            });
            
            // Scroll xuống nội dung đầu tiên sau khi ẩn câu hỏi
            setTimeout(() => {
                document.querySelector('.image-slider').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 800);
        }
    });
});

// JS xử lý nút "Không" nhảy chỗ
// Xử lý di chuyển nút "Không" và "Có"
btnKhong.addEventListener("mouseover", function() {
    if (!isMoving) {
        isMoving = true;
        
        // Lưu vị trí hiện tại của nút "Không"
        const khongRect = btnKhong.getBoundingClientRect();
        const khongCurrentPosition = {
            left: khongRect.left,
            top: khongRect.top
        };
        
        // Random vị trí mới cho nút "Không"
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = btnKhong.offsetWidth;
        const buttonHeight = btnKhong.offsetHeight;
        
        const maxX = viewportWidth - buttonWidth - 20;
        const maxY = viewportHeight - buttonHeight - 20;
        const newX = Math.min(Math.max(20, Math.random() * maxX), maxX);
        const newY = Math.min(Math.max(20, Math.random() * maxY), maxY);
        
        // Di chuyển nút "Không"
        btnKhong.style.position = 'fixed';
        btnKhong.style.right = 'auto';
        btnKhong.style.transform = 'none';
        btnKhong.style.left = newX + "px";
        btnKhong.style.top = newY + "px";
        
        // Di chuyển nút "Có" đến vị trí cũ của nút "Không"
        btnCo.style.position = 'fixed';
        btnCo.style.left = khongCurrentPosition.left + "px";
        btnCo.style.top = khongCurrentPosition.top + "px";
        btnCo.style.right = 'auto';
        btnCo.style.transform = 'none';
        btnCo.style.transition = 'all 0.3s ease';
        btnCo.style.zIndex = '9998';
        
        setTimeout(() => {
            isMoving = false;
        }, 300);
    }
});

// // Thêm hiệu ứng trở về vị trí ban đầu cho nút "Có"
// btnCo.addEventListener("transitionend", function() {
//     setTimeout(() => {
//         btnCo.style.position = 'absolute';
//         btnCo.style.left = '30%';
//         btnCo.style.top = 'auto';
//         btnCo.style.transform = 'translateX(-50%)';
//     }, 1000);
// });

// Xử lý ẩn/hiện nút khi cuộn
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > hideScrollPosition) {
        btnKhong.classList.add('hidden');
    } else {
        btnKhong.classList.remove('hidden');
    }
});

// Thêm code điều khiển slider
const slideContainer = document.querySelector('.slide-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

// Xử lý nút Previous
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slideContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
});

// Xử lý nút Next
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slideContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
});

// Reset animation khi click nút
function resetAnimation() {
    slideContainer.style.animation = 'none';
    setTimeout(() => {
        slideContainer.style.animation = 'slideShow 15s infinite';
    }, 10);
}

prevBtn.addEventListener('click', resetAnimation);
nextBtn.addEventListener('click', resetAnimation);

// Thêm hover để tạm dừng chuyển động
slideContainer.addEventListener('mouseenter', () => {
    slideContainer.style.animationPlayState = 'paused';
});

slideContainer.addEventListener('mouseleave', () => {
    slideContainer.style.animationPlayState = 'running';
});

// Thêm code xử lý header ẩn hiện
let lastScrollTop = 0;
const header = document.querySelector('header');
const hideHeaderPosition = 240; // Điều chỉnh vị trí muốn ẩn header

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ẩn header khi cuộn xuống quá hideHeaderPosition
    if (scrollTop > hideHeaderPosition) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    
    // Cập nhật vị trí cuộn cuối cùng
    lastScrollTop = scrollTop;
});