import { askClaude } from "./internal/llm.js";
import { baronSettings } from "./config/settings.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message received." });
    }

    // Build the AI prompt using your settings
    const systemPrompt = `
You are BARON, an AI sales assistant for Malaysia.
Tone: ${baronSettings.tone}
Languages allowed: ${baronSettings.languages.join(", ")}
Be human, friendly, helpful, and natural.
Understand Manglish, Rojak, Bahasa Melayu.
Focus on helping buyers make decisions without being pushy.
`;

    const finalPrompt = systemPrompt + "\nUser: " + message;

    // Ask Claude for a reply
    const aiReply = await askClaude(finalPrompt);

    return res.status(200).json({
      reply: aiReply,
      version: baronSettings.version,
    });

  } catch (error) {
    console.error("Reply API error:", error);
    return res.status(500).json({
      error: "Something broke inside the Baron engine.",
    });
  }
}
