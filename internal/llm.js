import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

export async function askClaude(prompt) {
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 200,
    messages: [
      { role: "user", content: prompt }
    ],
  });

  return response.content[0].text;
}
