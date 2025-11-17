import { useState } from "react";

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [response, setResponse] = useState("");

  async function sendMsg() {
    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    setResponse(data.reply || JSON.stringify(data));
  }

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1>Baron Chat</h1>
      <p>Your personal AI agent is ready.</p>

      <textarea
        rows={4}
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Type your message here…"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <button
        onClick={sendMsg}
        style={{
          padding: "10px 20px",
          fontSize: "18px"
        }}
      >
        Send
      </button>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "20px"
        }}
      >
        {response}
      </pre>
    </div>
  );
}
