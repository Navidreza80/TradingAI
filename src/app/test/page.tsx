"use client";

import { useEffect, useState } from "react";

const ChatAssistant = () => {
  const [data, setData] = useState();
  const getSignal = async () => {
    try {
      const history = await fetch(
        `/api/history?symbol=BTCUSDT&interval=1h&limit=100`
      );
      const priceHistory = await history.json();
      console.log(priceHistory)
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-thinking-exp:free",
            messages: [
              {
                role: "system",
                content: `You are a trading expert. Provide signals for crypto trades that user wants based on technical analysis and market data. Provide take profit, stop loss, the reason why this trade should be taken and the confidence level of the trade`,
              },
              {
                role: "user",
                content: `This is price history in 1h BTCUSDT provide a signal for that ${priceHistory}`,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "...",
      };
      console.log(data);
      setData(aiMessage);
      return data;
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  useEffect(() => {
    getSignal();
  }, []);

  return data && <div className="mt-20 text-white">{data.content}</div>;
};

export default ChatAssistant;
