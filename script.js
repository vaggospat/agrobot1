async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  const message = userInput.value.trim();
  if (message === "") return;

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  chatbox.appendChild(userMessage);
  userInput.value = "";

  const botMessage = document.createElement('div');
  botMessage.className = 'message bot';
  botMessage.textContent = "🔄 Αναλύω...";
  chatbox.appendChild(botMessage);
  chatbox.scrollTop = chatbox.scrollHeight;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  botMessage.textContent = data.reply;
  chatbox.scrollTop = chatbox.scrollHeight;
}
