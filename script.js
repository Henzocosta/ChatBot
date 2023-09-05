const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');

// Função para adicionar mensagens ao chatbox
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'chatbot-message';
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Função para enviar mensagem
function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    addMessage('Você: ' + userMessage, true);

    // Processar a resposta do chatbot aqui (pode chamar a função respond)
    const chatbotResponse = respond(userMessage);
    addMessage('Chatbot: ' + chatbotResponse, false);

    userInput.value = '';
}

// Adicione o evento de clique para enviar mensagem
submitBtn.addEventListener('click', sendMessage);

// Adicione o evento de pressionar Enter para enviar mensagem
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Função para responder à entrada do usuário
function respond(userInput) {
    const patterns = [
        {
            pattern: /(Olá|Oi|Oi chatbot)/i,
            responses: ["Olá! Como posso ajudar você hoje?", "Oi! Em que posso ser útil?"]
        },
        {
            pattern: /(estou triste|me sinto mal|sou infeliz)/i,
            responses: ["Sinto ouvir que você está se sentindo triste. Conte-me mais sobre isso.", "Por que você está se sentindo triste?"]
        },
        {
            pattern: /(não sei|não entendo|estou confuso)/i,
            responses: ["Você não tem certeza? Por que você acha que não sabe?", "Pode me contar mais sobre isso?"]
        },
        {
            pattern: /(porque|por que|por qual motivo)/i,
            responses: ["Você tem alguma ideia de por que isso está acontecendo?", "Isso é interessante. Pode me dizer mais sobre o motivo?"]
        },
        {
            pattern: /(não posso|não consigo|não tenho como)/i,
            responses: ["Por que você não pode fazer isso?"]
        },
        {
            pattern: /(preciso|quero|desejo)/i,
            responses: ["Por que você acha que precisa disso?"]
        },
        {
            pattern: /(mãe|pai)/i,
            responses: ["Como se sente em relação à sua mãe?", "Me fale mais sobre sua relação com seu pai."]
        },
        {
            pattern: /(filho|filha)/i,
            responses: ["Como se sente em relação ao seu filho?", "Me fale mais sobre sua relação com sua filha."]
        },
        {
            pattern: /(feliz|alegre|contente)/i,
            responses: ["Isso é ótimo! Por que você está se sentindo feliz?", "Fico feliz por você!"]
        },
        {
            pattern: /(triste|infeliz|deprimido)/i,
            responses: ["Sinto muito ouvir isso. Por que você está se sentindo triste?"]
        },
        {
            pattern: /(adeus|tchau|até logo)/i,
            responses: ["Até logo! Se precisar de mais ajuda, estarei aqui.", "Até a próxima!"]
        }
    ];

    for (const pattern of patterns) {
        if (userInput.match(pattern.pattern)) {
            return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        }
    }

    return "Não tenho certeza do que você está falando. Pode me dar mais detalhes?";
}

