async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  const message = userInput.value.trim();

  if (message === "") return;

  // Εμφανίζει το μήνυμα του χρήστη
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = message;
  chatbox.appendChild(userMessage);

  // Καθαρίζει το πεδίο εισαγωγής
  userInput.value = "";

  // Εμφανίζει προσωρινό μήνυμα φόρτωσης
  const botMessage = document.createElement('div');
  botMessage.className = 'message bot';
  botMessage.textContent = "🔄 Αναλύω την ερώτησή σου...";
  chatbox.appendChild(botMessage);

  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    // Καλεί το backend API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Εμφανίζει την απάντηση του AgroBot
    botMessage.textContent = data.reply;

  } catch (error) {
    botMessage.textContent = "❌ Υπήρξε κάποιο πρόβλημα. Προσπάθησε ξανά.";
    console.error("Error fetching AgroBot reply:", error);
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}

// Υποστήριξη πατήματος Enter στο πεδίο εισαγωγής
const inputField = document.getElementById('userInput');
inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
