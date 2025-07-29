import React, { useState, useRef, useEffect } from "react";
import "./App.newoneuse.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response }
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="app-container">
      <h1>TalentCentral Assistant</h1>

      <div className="chat-box">
        <div className="prompt-bubble">
          {[
            "What programs are available?",
            "How do I apply?",
            "Where is the job board?"
          ].map((prompt, index) => (
            <button key={index} onClick={() => setInput(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask the Assistant about jobs, training programs, or how to apply..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
