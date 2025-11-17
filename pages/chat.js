export default function Chat() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Chat Page</h1>
      <textarea id="msg" rows="4" cols="50" placeholder="Type here..."></textarea>
      <button onClick={async () => {
        const txt = document.getElementById("msg").value;
        const res = await fetch("/api/reply", {
          method: "POST",
          body: JSON.stringify({ text: txt }),
        });
        const data = await res.json();
        alert(data.reply);
      }}>Send</button>
    </div>
  );
}
