export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Μόνο POST αιτήματα επιτρέπονται.' });
  }

  let message;
  try {
    message = req.body.message;
  } catch (error) {
    return res.status(400).json({ error: 'Το σώμα του αιτήματος δεν είναι έγκυρο JSON.' });
  }

  if (!message) {
    return res.status(400).json({ error: 'Το πεδίο "message" είναι υποχρεωτικό.' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Είσαι ο AgroBot, βοηθός αγροτών θερμοκηπίου. Απάντησε επαγγελματικά και πρακτικά." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: 'Σφάλμα κατά την επικοινωνία με το OpenAI API.' });
  }
}
