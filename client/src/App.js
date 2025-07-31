import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.newoneuse.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    await sendMessageWithPrompt(input);
  };

  const sendMessageWithPrompt = async (text) => {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages([
      ...newMessages,
      { role: "assistant", content: "Typing...", typing: true }
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response || "No response available." }
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error retrieving the answer." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const promptOptions = [
    "What programs are available?",
    "How do I apply?",
    "Where is the job board?"
  ];

  return (
    <div className="app-container">
      <h1>Builders Life TalentCentral Assistant</h1>

      <p className="intro">
        Your one-stop destination for construction jobs and career support in BC.
        Whether you're just starting out, changing careers, or looking to grow in the
        construction industry, we connect you with job opportunities, training
        programs, and resources from the British Columbia Construction Association
        (BCCA) and its partners. Start here to explore the tools and support you need
        to build your future in construction.
      </p>

      <div className="chat-box">
        <div className="prompt-bubble">
          {promptOptions.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(prompt);
                sendMessageWithPrompt(prompt);
              }}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === "assistant" ? (
              <div className={msg.typing ? "typing" : ""}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="user-message">{msg.content}</div>
            )}
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
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="chat-actions">
        <button className="clear-btn" onClick={clearChat} disabled={loading}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default App;
