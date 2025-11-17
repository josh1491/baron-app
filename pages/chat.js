export default function ChatPage() {
  async function sendMsg() {
    const txt = document.getElementById("msg").value;

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: txt })
    });

    const data = await res.json();
    document.getElementById("response").innerText = data.reply;
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Baron Chat</h1>
      <p>Your personal AI agent is ready.</p>

      <textarea id="msg" rows="4" placeholder="Type your message here"></textarea>
      <br />
      <button onClick={sendMsg}>Send</button>

      <pre id="response" style={{ marginTop: "20px" }}></pre>
    </div>
  );
}
