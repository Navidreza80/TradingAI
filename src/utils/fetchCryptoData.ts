import axios from 'axios';

export async function fetchCryptoData(symbol, days = 365) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: days,
        },
      }
    );
    return response.data.prices; // Array of [timestamp, price]
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null;
  }
}