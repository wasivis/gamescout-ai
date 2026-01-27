// app/api/recommend/route.ts
import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

// Initialize Groq ONCE outside the request handler
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // NO "NEXT_PUBLIC_" prefix!
});

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    const prompt = `
      User Input: "${input}"
      Suggest exactly 5 video games. 
      Return a JSON object where the key is "games" and the value is an array of objects.
      Each object must have: "title", "genre", "description", "vibeScore", and "whyForYou".
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional Game Scout. You only output valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const rawResponse = chatCompletion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(rawResponse);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Groq Server Error:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}