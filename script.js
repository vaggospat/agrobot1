async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  const message = userInput.value.trim();
  if (message === "") return;

  // μήνυμα χρήστη
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  chatbox.appendChild(userMessage);
  userInput.value = "";

  // μήνυμα "περιμένω..."
  const botMessage = document.createElement('div');
  botMessage.className = 'message bot';
  botMessage.textContent = "🔄 Αναλύω...";
  chatbox.appendChild(botMessage);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Κλήση στο OpenAI API
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Είσαι ο AgroBot, βοηθός αγροτών θερμοκηπίου. Απάντησε επαγγελματικά και πρακτικά στις ερωτήσεις τους." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  botMessage.textContent = data.choices[0].message.content;
  chatbox.scrollTop = chatbox.scrollHeight;
}
