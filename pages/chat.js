import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage = {
        role: "assistant",
        content: data.reply || "No reply from server",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to AI server." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Baron Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "15px",
          borderRadius: "8px",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "12px",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                background: msg.role === "user" ? "#d1e7ff" : "#e9e9e9",
              }}
            >
              <strong>{msg.role === "user" ? "You" : "Baron"}:</strong>{" "}
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            background: "#222",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
