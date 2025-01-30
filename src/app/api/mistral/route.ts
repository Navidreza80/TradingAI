export async function POST(req) {
  const { prompt } = await req.json();

  const API_KEY = "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"; // Replace with your actual key

  const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`, // Ensure "Bearer" is included
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  console.log(response);

  if (!response.ok) {
    const errorText = await response.text();
    return Response.json({ error: `Request failed: ${errorText}` }, { status: response.status });
  }

  const data = await response.json();
  return Response.json({ result: data });

  console.log(data);
}
