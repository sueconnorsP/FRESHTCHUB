body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f7f7f7;
  color: #800020;
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #800020;
}

.intro {
  font-size: 15px;
  line-height: 1.5;
  margin: 10px 0 20px;
  color: #333;
  text-align: center;
}

.chat-box {
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 8px;
  max-width: 75%;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 15px;
}

.message.user {
  background-color: #800020;
  color: white;
  align-self: flex-end;
}

.message.assistant {
  background-color: white;
  color: black;
  align-self: flex-start;
}

/* Markdown support */
.markdown ul,
.markdown ol {
  padding-left: 1.5em;
  margin: 0.5em 0;
  list-style: disc outside;
}

.markdown li {
  margin: 0.2em 0;
  line-height: 1.4;
}

.markdown h1,
.markdown h2,
.markdown h3 {
  margin: 8px 0 4px;
  font-weight: bold;
}

.markdown a {
  color: #800020;
  text-decoration: underline;
}

.input-area {
  display: flex;
  margin-top: 15px;
  gap: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #800020;
  border-radius: 6px;
  font-size: 16px;
}

button {
  background-color: #800020;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #a10028;
}

.prompt-bubble {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.prompt-bubble button {
  background-color: #800020;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
}

.prompt-bubble button:hover {
  background-color: #a10028;
}

.chat-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.clear-btn {
  background-color: #ddd;
  color: #800020;
  border: 1px solid #800020;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:hover {
  background-color: #ccc;
}

.source-tag {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.source-tag a {
  color: #007acc;
  text-decoration: none;
}

.source-tag a:hover {
  text-decoration: underline;
}

#chat-end {
  padding-bottom: 30px;
}
