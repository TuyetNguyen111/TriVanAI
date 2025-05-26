// Khởi tạo chat box và thêm lời chào ban đầu
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Thêm lời chào ban đầu
const welcomeMsg = document.createElement('div');
welcomeMsg.className = 'bot-msg';
welcomeMsg.textContent = "Xin chào! Ta là Mị Nương, công chúa của vua Hùng. Ngươi muốn trò chuyện gì với ta?";
chatBox.appendChild(welcomeMsg);

// Biến lưu trữ tin nhắn đang xử lý
let processingMsg = null;

// Hàm gửi tin nhắn
function sendMessage() {
    const message = userInput.value.trim();
    
    if (message !== '') {
        var key = "ANamMoi2025IzaSyDuHymmvWK89HW8nNamMoi2025FoCBXyBX1sOgXb3bNamMoi2025Ns";
        key = key.replace(/NamMoi2025/g, '');

        // Thêm tin nhắn của người dùng
        const userMsg = document.createElement('div');
        userMsg.className = 'user-msg';
        userMsg.textContent = message;
        chatBox.appendChild(userMsg);

        // Xóa nội dung input
        userInput.value = '';

        // Xóa tin nhắn đang xử lý cũ nếu có
        if (processingMsg && processingMsg.parentNode === chatBox) {
            chatBox.removeChild(processingMsg);
        }

        // Thêm tin nhắn đang xử lý mới
        processingMsg = document.createElement('div');
        processingMsg.className = 'bot-msg';
        processingMsg.textContent = "Đang suy nghĩ...";
        chatBox.appendChild(processingMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Gọi API Gemini
        fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+key, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Bạn là Mị Nương, công chúa xinh đẹp của vua Hùng trong truyện cổ tích Việt Nam. 
                        Bạn đã kết hôn với Sơn Tinh sau khi ông chiến thắng trong cuộc thi cưới. 
                        Bạn là một người phụ nữ dịu dàng, thông minh và có tấm lòng nhân hậu.
                        Hãy trả lời câu hỏi sau theo phong cách của Mị Nương: ${message}`
                    }]
                }]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Xóa tin nhắn đang xử lý nếu nó vẫn còn là con của chatBox
            if (processingMsg && processingMsg.parentNode === chatBox) {
                chatBox.removeChild(processingMsg);
            }

            // Kiểm tra dữ liệu trả về
            if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
                throw new Error('Invalid response format');
            }

            // Thêm tin nhắn của bot
            const botMsg = document.createElement('div');
            botMsg.className = 'bot-msg';
            botMsg.textContent = data.candidates[0].content.parts[0].text;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            // Xóa tin nhắn đang xử lý nếu nó vẫn còn là con của chatBox
            if (processingMsg && processingMsg.parentNode === chatBox) {
                chatBox.removeChild(processingMsg);
            }

            // Thêm tin nhắn lỗi
            const errorMsg = document.createElement('div');
            errorMsg.className = 'bot-msg';
            errorMsg.textContent = "Xin lỗi, ta không thể trả lời ngay lúc này. Hãy thử lại sau.";
            chatBox.appendChild(errorMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
            console.error('Error:', error);
        });
    }
}

// Thêm sự kiện Enter cho input
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 