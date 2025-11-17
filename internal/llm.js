import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function askClaude(message) {
  try {
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 200,
      messages: [{ role: "user", content: message }],
    });

    return response.content[0].text;
  } catch (err) {
    console.error("Claude Error →", err);
    return "Baron is thinking…";
  }
}

