// سرویس‌های API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 