// app/api/get-signal/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { symbol, timeFrame, priceHistory } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
            content: `You are a trading expert. Provide signals for crypto trades based on technical analysis and market data. Return response as an object: 
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
            content: `This is price history in ${timeFrame} ${symbol}. Provide a signal for that ${priceHistory}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const aiMessage = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "...",
      };
    return NextResponse.json(aiMessage);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json({ error: "Failed to fetch trading signal" }, { status: 500 });
  }
}
