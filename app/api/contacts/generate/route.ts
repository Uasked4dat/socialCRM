import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI instance with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Define a structured schema for extracting names and associated content
const schema = {
    description: "List of people with associated facts as an array",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Name of the person",
          nullable: false,
        },
        content: {
          type: SchemaType.ARRAY,
          description: "Array of facts related to the person",
          items: {
            type: SchemaType.STRING,
            description: "An individual fact about the person",
            nullable: false,
          },
        },
      },
      required: ["name", "content"],
    },
  };

// Configure the model to use the schema and respond in JSON
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
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
