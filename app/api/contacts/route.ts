import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import mongoose from 'mongoose';

// Define a schema for the contact entry
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the contact entry
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Handle GET requests to fetch all contacts
export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Retrieve all contacts
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sorting by created date, newest first

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Handle POST requests to add a new contact
export async function POST(req: NextRequest) {
  const { name, information } = await req.json();

  if (!name || typeof name !== 'string' || !information || typeof information !== 'string') {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Create a new contact entry
    const newContact = new Contact({ name, information });

    // Save the contact entry to the database
    await newContact.save();

    return NextResponse.json({ message: 'Contact added successfully', contact: newContact }, { status: 201 });
  } catch (error) {
    console.error('Error adding contact:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
