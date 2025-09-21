import React, { useState, useRef, useEffect } from 'react';
import './chat-window.css';

const initialMessages = [
  {
    sender: 'bot',
    text: "Hello! I'm AI Dost, your caring companion for mental wellness. I'm here to listen without judgment and support you through whatever you're feeling. How are you doing today? 🌱",
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isEnlarged, setIsEnlarged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // Simulate bot reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'bot',
          text:
            "Thank you for sharing. If you're feeling tense, I'm here to help. Would you like some relaxation tips or just to talk? 😊",
        },
      ]);
    }, 800);
  };

  return (
    <div className={`chat-container${isEnlarged ? ' enlarged' : ''}`}>
      <div className="chat-header">
        <div className="chat-header-left">
          <h3 className="chat-header-name">AI Dost</h3>
          <div className="chat-header-avatar">
            🤖
          </div>
        </div>
        <div className="chat-header-info">
          <h2 className="chat-header-title">Welcome</h2>
          <p className="chat-header-subtitle">Your caring companion</p>
        </div>
        <button
          className="chat-enlarge-btn"
          onClick={() => setIsEnlarged((v) => !v)}
          title={isEnlarged ? 'Shrink Chat' : 'Enlarge Chat'}
        >
          {isEnlarged ? '🗕' : '🗖'}
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
            <div className="chat-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} title="Send">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
