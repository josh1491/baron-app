import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'POST only' })

  const { sellerEmail, buyerMessage } = req.body

  if (!sellerEmail || !buyerMessage)
    return res.status(400).json({ error: 'Missing fields' })

  // Claude prompt
  const systemPrompt = `
You are BARON, an AI assistant for Malaysian e-commerce.
Behave like a professional seller helper.
Tone: friendly, a bit Manglish when the buyer uses Malay/Manglish.
Never invent facts or fake delivery info.
Keep replies short, helpful, sales-driven.
Ask clarifying questions when needed.
Upsell when reasonable.
  `.trim()

  const userPrompt = `
Buyer wrote: "${buyerMessage}"

Generate the BEST possible reply.
  `.trim()

  const bodyData = {
    model: "claude-2.1",
    prompt: systemPrompt + "\n\n" + userPrompt,
    max_tokens_to_sample: 350
  }

  const resp = await fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY
    },
    body: JSON.stringify(bodyData)
  })

  const result = await resp.json()
  const baronReply = (result.completion || '').trim()

  // save to DB
  await supabase.from('baron_replies').insert([
    { seller_email: sellerEmail, buyer_message: buyerMessage, baron_reply: baronReply }
  ])

  return res.json({ reply: baronReply })
}
