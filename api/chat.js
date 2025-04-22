export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }

    const { message } = req.body;

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
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
