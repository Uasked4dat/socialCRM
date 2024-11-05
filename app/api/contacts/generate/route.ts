import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI instance with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Define a structured schema for extracting names and associated content
const schema = {
  "type": SchemaType.ARRAY,
  "description": "A list of people with their associated fact(s), represented as an array that has 1 or more elements.",
  "items": {
    "type": SchemaType.OBJECT,
    "properties": {
      "name": {
        "type": SchemaType.STRING,
        "description": "The full name of the person. First name only if no last name is provided.",
        "nullable": false
      },
      "content": {
        "type": SchemaType.ARRAY,
        "description": "An array of discrete factual statement(s) about the person. Each fact should be short, without names, pronouns, or extra phrases. If there's only one fact, the array should contain exactly one item. Do not add punctuation or extraneous details.",
        "items": {
          "type": SchemaType.STRING,
          "description": "A concise fact about the person, without any names, pronouns (like 'he/she'), or extra phrases. Example: 'likes skiing'.",
          "nullable": false
        }
      }
    },
    "required": [
      "name",
      "content"
    ]
  }
};



// Configure the model to use the schema and respond in JSON
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
    temperature: 1
  },
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  try {
    // Generate structured content based on the prompt
    const result = await model.generateContent(prompt);

    // Parse the JSON string response to return as an actual JSON array
    const structuredResponse = JSON.parse(result.response.text());

    // Send the structured JSON response back to the client
    return NextResponse.json({ structuredResponse }, { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
