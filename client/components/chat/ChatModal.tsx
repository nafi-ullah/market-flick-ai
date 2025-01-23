import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHistory, FaMinus } from 'react-icons/fa';

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; isOutgoing: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    setMessages((prev) => [...prev, { text: inputValue, isOutgoing: true }]);
    setInputValue('');

    // Simulate an incoming message
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'Hello! How can I assist you?', isOutgoing: false }]);
    }, 1000);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-gray-800 text-white w-96 h-[500px] rounded-lg shadow-lg flex flex-col overflow-hidden"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-gray-900 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold">Chatbot</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:text-indigo-500">
            <FaHistory size={16} />
          </button>
          <button className="hover:text-indigo-500">
            <FaMinus size={16} />
          </button>
          <button className="hover:text-red-500" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isOutgoing ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.isOutgoing
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-gray-900 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-700 rounded-lg text-sm text-white focus:outline-none"
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotModal;
