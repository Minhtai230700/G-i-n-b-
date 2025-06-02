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

btnCo.addEventListener("click", function () {
    // Ẩn phần câu hỏi ngay khi hiện alert
    const loveQuestion = document.querySelector('.love-question');
    loveQuestion.classList.add('hidden');
    loveQuestion.style.display = 'none';

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
btnKhong.addEventListener("mouseover", function () {
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

// Xử lý ẩn/hiện nút khi cuộn
window.addEventListener('scroll', function () {
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

// Xử lý nút cuộn lên đầu trang
const scrollToTopBtn = document.getElementById("scrollToTop");

// Hiện nút khi cuộn xuống 100px
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Xử lý sự kiện click
scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Chat Bot Functions
const chatHeart = document.getElementById('chatHeart');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');

// Đảm bảo chat container ẩn khi load trang
document.addEventListener('DOMContentLoaded', () => {
    chatContainer.classList.remove('active');
    chatMessages.innerHTML = '';
});

// Hiệu ứng gõ chữ cho bot, user gửi bình thường
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    if (!isUser) {
        let i = 0;
        messageDiv.textContent = '';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        const typing = setInterval(() => {
            messageDiv.textContent += message[i];
            i++;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            if (i === message.length) clearInterval(typing);
        }, 50);
    } else {
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Định nghĩa các câu hỏi và câu trả lời
const chatResponses = {
    "sinh nhật của em": "Sinh nhật của em yêu là ngày 01/01/2001 💝",
    "sinh nhật em": "Sinh nhật của em yêu là ngày 01/01/2001 💝",
    "sinh nhật của anh": "Sinh nhật của anh là ngày 23/07/2000 💓",
    "sinh nhật anh": "Sinh nhật của anh là ngày 23/07/2000 💓",
    "ngày quen nhau": "Chúng mình quen nhau ngày 07/10/2024, một ngày rất tuyệt vời 💑",
    "quen nhau": "Chúng mình quen nhau ngày 07/10/2024, một ngày rất tuyệt vời 💑",
    "lần đầu gặp nhau": "Lần đầu mình gặp nhau tại quán nhậu 87 nè 🌹",
    "kỷ niệm đáng nhớ": "Mỗi khoảnh khắc bên em đều là kỷ niệm đáng nhớ với anh 💕",
    "đi đâu cùng nhau": "Chúng mình đã đi Đà Lạt, và sẽ còn đi nhiều nơi nữa 🌎",
    "yêu em không": "Anh yêu em nhiều lắm 💗",
    "thích gì ở em": "Anh thích tất cả mọi thứ ở em, từ nụ cười đến tính cách 💖",
    "nhớ em": "Anh cũng đang nhớ em nhiều lắm 💝",
    "hello": "Chào em yêu của anh 💕",
    "hi": "Chào em yêu của anh 💕",
    "chào": "Chào em yêu của anh 💕",
    "em thích":"Em thích được anh cưng chiều 💕",
    "sắp":"sắp tới anh sẽ dẫn em đi Vũng Tàu nhé 💕",
    "cưới":"Anh sẽ cố gắn để sớm được rước em về làm dâu nhà anh 💕",
    "hỏi":"Em có thể hỏi anh các câu hỏi như ngày sinh của em và anh, kỷ niệm, hoặc là ngày chúng mình quen nhau",
    "tại sao":"Anh yêu em vì con người của em 💕",
    "kỷ niệm":"Mỗi khoảnh khắc bên em đều là kỷ niệm đáng nhớ với anh 💕",
};

function getBotResponse(input) {
    const lowercaseInput = input.toLowerCase().trim();
    for (const key in chatResponses) {
        if (lowercaseInput.includes(key)) {
            return chatResponses[key];
        }
    }
    return "Anh chưa hiểu câu hỏi. Em có thể hỏi anh về sinh nhật, ngày quen nhau và những kỷ niệm của chúng mình 💕";
}

// Xử lý gửi tin nhắn
function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, true);
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 500);
    userInput.value = '';
    userInput.focus();
}

// Gửi tin nhắn khi nhấn nút hoặc Enter
sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
});

// Tin nhắn chào mừng khi mở chat lần đầu
chatHeart.addEventListener('click', () => {
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active') && chatMessages.children.length === 0) {
        setTimeout(() => {
            addMessage('Chào em yêu, em muốn hỏi gì về chúng mình nào? 💕', false);
        }, 500);
    }
});

// Đóng chat và clear messages
closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
    chatMessages.innerHTML = '';
});
