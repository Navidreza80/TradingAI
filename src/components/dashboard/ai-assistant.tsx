'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { MessageSquare, Send, MessageCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';

const ChatAssistant = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-thinking-exp:free',
          messages: [
            { role: 'system', content: `You are a useful trading expert. Guide the user to make better trading decisions and help navigate the TradingAI website.
              Website information:
              - Home: [Home](localhost3000)
              - Blogs: [Blogs](/blogs)
              - Signals: [Signals](/suggestion)
              - About: [About](/about)
              - Dashboard: [Dashboard](/dashboard)
              - Market & Trade: [Market & Trade](/trade)
              - Education: [Education](/education)` },
            ...messages,
            userMessage
          ],
        }),
      });
      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.choices[0]?.message?.content || '...' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-20 right-6 z-50 w-80 p-4 border rounded-2xl shadow-lg transition-all ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2"><MessageSquare /> Chat with AI</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <X size={20} />
            </button>
          </div>
          <Card className={`p-4 space-y-3 h-80 overflow-y-auto rounded-xl shadow-inner ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white ml-auto' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} max-w-[75%]`}
              >
                {msg.content}
              </motion.div>
            ))}
            {loading && <p className="text-gray-500 text-sm">AI is thinking...</p>}
          </Card>
          <div className="flex gap-2 mt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={loading}>
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;