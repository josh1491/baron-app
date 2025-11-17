export default function ChatPage() {
  async function sendMsg() {
    const txt = document.getElementById("msg").value;

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: txt })
    });

    const data = await res.json();
    document.getElementById("response").innerText =
      data.reply || JSON.stringify(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Baron Chat</h2>

      <textarea id="msg" rows="4" style={{ width: "100%" }}></textarea>
      <br /><br />

      <button onClick={sendMsg}>Send</button>

      <pre id="response"></pre>
    </div>
  );
}
