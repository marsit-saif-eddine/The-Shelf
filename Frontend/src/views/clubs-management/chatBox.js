import React, { useState, useEffect } from "react";
import axios from "axios";
import './chatbox-styles.scss';
const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // send initial message to ChatGPT API
    sendMessage("");
  }, []);

  const sendMessage = async (text) => {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Conversation\nUser: ${text}\nAI:`,
        max_tokens: 4000,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${'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'}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].text.trim();
    setMessages([...messages, { text: message, isUser: false }]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue+"", isUser: true }]);
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header"><span>Smart chat box</span><button className="btn btn-outline-secondary btn-sm" onClick={() => props.hideFunc()}>X</button></div>
      <div className="chatbox-body">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "ai"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbox-footer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputValue}
            className="form-control"
            onChange={handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
