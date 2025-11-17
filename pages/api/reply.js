import { Anthropic } from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 200,
    messages: [{ role: "user", content: message }]
  });

  res.status(200).json({ reply: response.content[0].text });
}
