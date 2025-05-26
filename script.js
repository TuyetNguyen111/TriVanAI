// Định nghĩa các nhân vật và câu trả lời của họ
const characters = {
    'son-tinh': {
        name: 'Sơn Tinh',
        responses: [
            'Ta là Sơn Tinh, chúa tể của núi rừng!',
            'Núi rừng là nhà của ta, nơi ta trị vì muôn loài.',
            'Mị Nương là người vợ yêu quý của ta.',
            'Thuỷ Tinh kia, hãy rút lui đi!',
            'Ta sẽ bảo vệ vương quốc của ta khỏi mọi hiểm nguy.'
        ]
    },
    'thuy-tinh': {
        name: 'Thuỷ Tinh',
        responses: [
            'Ta là Thuỷ Tinh, chúa tể của biển cả!',
            'Nước là sức mạnh của ta, là quyền năng của ta.',
            'Mị Nương phải là vợ của ta!',
            'Sơn Tinh kia, hãy trả lại Mị Nương cho ta!',
            'Biển cả sẽ dâng cao, nhấn chìm tất cả!'
        ]
    },
    'vua-hung': {
        name: 'Vua Hùng',
        responses: [
            'Ta là Vua Hùng, vị vua của muôn dân.',
            'Mị Nương là con gái yêu quý của ta.',
            'Các ngươi hãy cạnh tranh công bằng để giành lấy Mị Nương.',
            'Ta sẽ chọn người xứng đáng nhất làm rể.',
            'Hãy để ta quyết định việc này.'
        ]
    },
    'mi-nuong': {
        name: 'Mị Nương',
        responses: [
            'Con là Mị Nương, con gái của Vua Hùng.',
            'Con không muốn làm buồn lòng cha.',
            'Con sẽ chọn người xứng đáng nhất.',
            'Con mong muốn một cuộc sống hạnh phúc.',
            'Con sẽ làm theo quyết định của cha.'
        ]
    }
};

let currentCharacter = null;

// Khởi tạo các sự kiện
document.addEventListener('DOMContentLoaded', () => {
    const characterButtons = document.querySelectorAll('.character-btn');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');
    const chatContainer = document.getElementById('chat-container');

    // Xử lý sự kiện chọn nhân vật
    characterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const characterId = button.dataset.character;
            currentCharacter = characters[characterId];
            
            // Thêm tin nhắn chào mừng
            addMessage(`Xin chào! Tôi là ${currentCharacter.name}.`, 'character');
            
            // Cập nhật style cho nút được chọn
            characterButtons.forEach(btn => btn.style.backgroundColor = '');
            button.style.backgroundColor = '#007bff';
            button.style.color = 'white';
        });
    });

    // Xử lý sự kiện gửi tin nhắn
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message && currentCharacter) {
            addMessage(message, 'user');
            messageInput.value = '';
            
            // Tạo câu trả lời ngẫu nhiên từ nhân vật
            setTimeout(() => {
                const randomResponse = currentCharacter.responses[Math.floor(Math.random() * currentCharacter.responses.length)];
                addMessage(randomResponse, 'character');
            }, 1000);
        }
    }

    // Gửi tin nhắn khi nhấn nút
    sendButton.addEventListener('click', sendMessage);
    
    // Gửi tin nhắn khi nhấn Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Hàm thêm tin nhắn vào chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}); 