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
    const contacts = await Contact.find();

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Handle POST requests to add or update a contact
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if the request is for bulk addition
    if (Array.isArray(body.entries)) {
      const entries = body.entries;

      // Connect to MongoDB
      await connectMongo();

      const operations = entries.map((entry: { name: string; information: string }) => ({
        updateOne: {
          filter: { name: entry.name },
          update: [
            {
              $set: {
                information: {
                  $concat: [
                    { $ifNull: ["$information", ""] },
                    {
                      $cond: [
                        { $or: [{ $eq: ["$information", null] }, { $eq: ["$information", "" ]}] },
                        "",
                        ", "
                      ]
                    },
                    entry.information
                  ]
                }
              }
            }
          ],
          upsert: true
        }
      }));

      // Perform bulk write operation
      await Contact.bulkWrite(operations);

      return NextResponse.json({ message: 'Contacts processed successfully' }, { status: 201 });
    } else {
      // Single contact addition
      const { name, information } = body;

      if (!name || typeof name !== 'string' || !information || typeof information !== 'string') {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
      }

      // Connect to MongoDB
      await connectMongo();

      let contact = await Contact.findOne({ name });

      if (contact) {
        contact.information = `${contact.information}, ${information}`;
        await contact.save();
      } else {
        contact = new Contact({ name, information });
        await contact.save();
      }

      return NextResponse.json({ message: 'Contact processed successfully', contact }, { status: 201 });
    }
  } catch (error) {
    console.error('Error processing contact(s):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Handle DELETE requests to delete a contact by ID
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongo();

    // Delete the contact entry by ID
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
