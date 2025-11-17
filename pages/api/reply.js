import { Anthropic } from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const completion = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [{ role: "user", content: req.body.message }]
    });

    res.status(200).json({ reply: completion.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
