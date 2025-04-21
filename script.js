
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatbox = document.getElementById('chatbox');
    const message = userInput.value.trim();
    
    if (message === "") return;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatbox.appendChild(userMessage);

    userInput.value = "";

    setTimeout(() => {
        const botReply = document.createElement('div');
        botReply.className = 'message bot';
        botReply.textContent = "🔧 Καταγράφηκε η ερώτησή σου: '" + message + "'. Πολύ σύντομα θα λαμβάνεις εξειδικευμένες συμβουλές!";
        chatbox.appendChild(botReply);
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);
    
    chatbox.scrollTop = chatbox.scrollHeight;
}
