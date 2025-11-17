export async function POST(request) {
  const body = await request.json();
  const message = body.message || "";

  return Response.json({
    reply: "You said: " + message,
  });
}
