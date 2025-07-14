/* eslint-disable */
"use client";
// React built in hooks
import { useState, useRef, useEffect } from "react";
// Framer motion for animation
import { motion, AnimatePresence } from "framer-motion";
// ShadCn components
import { Input } from "../UI/input";
import { Button } from "../UI/Button";
import { Card } from "../UI/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../UI/tooltip";
// Icons
import { MessageSquare, Send, MessageCircle, X, Loader2 } from "lucide-react";
// Redux for state management
import { useSelector } from "react-redux";

// Types
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const ChatAssistant = () => {
  // Redux isDarkMode hook
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  // State to save message of the user
  const [messages, setMessages] = useState<Message[]>([]);
  // State to save the value of the input
  const [input, setInput] = useState("");
  // State to save the status of the loading
  const [loading, setLoading] = useState(false);
  // State to save the value of the isOpen for ai-assistant chat
  const [isOpen, setIsOpen] = useState(false);
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect for auto-scrolling
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle input submission with enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to post user message to AI assistant
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Get the API key from .env
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-thinking-exp:free",
            messages: [
              {
                role: "system",
                content: `You are a useful trading expert. Guide the user to make better trading decisions and help navigate the TradingAI website.
                Website information:
                - Home: localhost3000
                desc: This is the page where user can see website information as a whole, like other website landing page
                - Blogs: /blogs
                desc: This is the page where user can read about latest cryptocurrency news
                - Signals: /signals
                desc: This is the page where user can generate trading signals with AI by selecting the currency
                - About: /about
                desc: This is the page where user can learn more about website creators and goals
                - Dashboard: /dashboard
                desc: This is the page where user can see his/her overall trading status, win rate, total trade, closed position history, total profit, current site plan, most traded currency by his/her, winning and loosing trades past 6 months, profits past 6 months
                - Market & Trade: /trade
                desc: This is the page where user can execute trades in demo mode
                - Strategies: /education
                desc: This is the page where user can past a test, learn about indicators or technical trading strategies
                - Market: /market
                desc: This is the page where user can see cryptocurrencies by them market cap and details`,
              },
              ...messages.map(({ role, content }) => ({ role, content })),
              { role: "user", content: input },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "Error",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Function to format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className={`fixed z-50 bottom-6 ${
                isDarkMode ? "right-6" : "left-6"
              } p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle
                size={24}
                className={isDarkMode ? "text-white" : "text-blue-500"}
              />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            {isOpen ? "Close" : "Open"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-20 ${
              isDarkMode ? "right-6" : "left-6"
            } z-50 w-80 rounded-2xl shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-gray-900 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Chat Header */}
            <div
              className={`p-4 flex justify-between items-center border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-lg font-bold flex items-center gap-2 text-black dark:text-white">
                <MessageSquare
                  className={isDarkMode ? "text-white" : "text-blue-500"}
                />
                Chat
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <Card
              className={`p-4 space-y-4 h-[400px] overflow-y-auto ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.timestamp && (
                    <span
                      className={`text-xs mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </Card>

            {/* Chat Input */}
            <div className="p-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`flex-1 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900"
                }`}
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                } bg-blue-500 text-white`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;
