// src/app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer).toString('base64');

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

    const payload = {
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
      },
      audio: {
        content: audioBytes,
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from Google API:', errorText);
      return NextResponse.json({ error: 'Error transcribing audio' }, { status: 500 });
    }

    const data = await response.json();
    const transcription = data.results
      .map((result: any) => result.alternatives[0].transcript)
      .join('\n');

    // console.log('Transcription:', transcription);
    return NextResponse.json({ transcription });
  } catch (err) {
    console.error('Error during transcription:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
