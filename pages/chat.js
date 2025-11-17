export default function ChatPage() {
  return (
    <div style={{
      fontFamily: "Arial",
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1>Baron Chat</h1>
      <p>Your personal AI agent is ready.</p>

      <textarea id="msg" rows="4" style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px"
      }} placeholder="Type your message here..."></textarea>

      <button onclick="sendMsg()" style={{
        padding: '10px 20px',
        fontSize: '16px'
      }}>Send</button>

      <pre id="response" style={{
        whiteSpace: 'pre-wrap',
        marginTop: "20px"
      }}></pre>

      <script>
        async function sendMsg() {
          const txt = document.getElementById("msg").value;

          const res = await fetch("/api/reply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: txt })
          });

          const data = await res.json();
          document.getElementById("response").innerText = data.reply || JSON.stringify(data);
        }
      </script>
    </div>
  );
}
