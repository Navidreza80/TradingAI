"use client";

import { useEffect, useState } from "react";

const ChatAssistant = () => {
  const [data, setData] = useState();
  const getSignal = async () => {
    try {
      const symbol = "BTCUSDT";
      const timeFrame = "1h"
      const candles = "100"
      const priceData = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=100`
      );
      const priceHistory = await priceData.json();
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
                content: `You are a trading expert. Provide signals for crypto trades that user wants based on technical analysis and market data. Provide take profit, stop loss, the reason why this trade should be taken and the confidence level of the trade. return the response as a javascript object: 
              {
                stopLoss: "",
                takeProfit: "",
                reason: "",
                confidenceLevel: "",
                entryPrice: ""
              }`,
              },
              {
                role: "user",
                content: `This is price history in ${timeFrame} ${symbol} provide a signal for that ${priceHistory}`,
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
