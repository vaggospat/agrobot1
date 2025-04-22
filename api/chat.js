export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    // Buffer & Parse the body manually (Vercel workaround)
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { message } = body;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Είσαι ο AgroBot, βοηθός αγροτών θερμοκηπίου. Απάντησε επαγγελματικά και πρακτικά."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await openaiRes.json();
    return res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
