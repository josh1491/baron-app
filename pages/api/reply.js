export default async function handler(req, res) {
  const body = JSON.parse(req.body || "{}");

  res.status(200).json({
    reply: "Your message was: " + body.text
  });
}
