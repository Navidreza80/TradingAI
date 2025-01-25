// APIS
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// fetch data
export const fetchData = async (endpoint: string) => {
  try {

    // fetch data config
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
} 