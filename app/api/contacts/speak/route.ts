// /app/api/contacts/speak/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { text, voiceId } = await request.json();

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
    }

    const audioStream = response.body;

    // Return a streaming response
    return new Response(audioStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error generating audio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
