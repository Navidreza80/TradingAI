import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // DeepSeek API endpoint
  apiKey: process.env.DEEPSEEK_API_KEY, // Store your API key in environment variables
  dangerouslyAllowBrowser: true,
});

export async function analyzeWithDeepSeek(symbol, prices) {
  try {
    // Prepare the data for DeepSeek
    const priceData = prices
      .map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price,
      }))
      .slice(-30); // Use the last 30 days of data for analysis

    const prompt = `You are a cryptocurrency trading assistant. Analyze the following price data for ${symbol.toUpperCase()} and provide a trade suggestion. Include the entry price (EP), stop loss (SL), take profit (TP), reasoning, and confidence level (1-100).

Price Data:
${JSON.stringify(priceData, null, 2)}

Trade Suggestion:`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful cryptocurrency trading assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'deepseek-chat', // Use the DeepSeek model
    });

    // Parse the response
    const suggestion = completion.choices[0].message.content;
    return suggestion;
  } catch (error) {
    console.error('Error analyzing data with DeepSeek:', error);
    return null;
  }
}