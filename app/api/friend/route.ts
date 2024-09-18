// API endpoint to store new friends generated from the form.

import connectMongo from '@/libs/mongoose';
import Friend from '@/models/Friend';
import { NextResponse } from 'next/server';

// MongoDB connection
export async function GET() {
  await connectMongo();
  try {
    const friends = await Friend.find();
    return NextResponse.json(friends, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch friend profiles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
    await connectMongo();
    try {
      const body = await req.json();
      console.log('Request body:', body); // Log the incoming request body
      const { name, baseLocation, location, notes, interests } = body;
  
      const newFriend = new Friend({ name, baseLocation, location, notes, interests });
      await newFriend.save();
      
      return NextResponse.json(newFriend, { status: 201 });
    } catch (error: any) {
      console.error('Error:', error); // Log the full error for debugging
      return NextResponse.json(
        { error: 'Failed to create friend profile', message: error.message, stack: error.stack },
        { status: 500 }
      );
    }
  }