import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on the userId field
contactSchema.index({ userId: 1 });

// Create a model for the contact entry
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Handle GET requests to fetch all contacts for the authenticated user
export async function GET(req: NextRequest) {
  const start = Date.now();
  try {
    console.log('Connecting to MongoDB...');
    const mongoStart = Date.now();
    await connectMongo();
    console.log(`Connected to MongoDB in ${Date.now() - mongoStart}ms`);

    console.log('Fetching session...');
    const sessionStart = Date.now();
    const session = await getServerSession(authOptions);
    console.log(`Fetched session in ${Date.now() - sessionStart}ms`);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    console.log('Fetching contacts...');
    const contactsStart = Date.now();
    const contacts = await Contact.find({ userId }).lean();
    console.log(`Fetched contacts in ${Date.now() - contactsStart}ms`);

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    console.log(`Total time: ${Date.now() - start}ms`);
  }
}

// Handle POST requests to add or update contacts for the authenticated user
export async function POST(req: NextRequest) {
  const start = Date.now();
  try {
    console.log('Connecting to MongoDB...');
    const mongoStart = Date.now();
    await connectMongo();
    console.log(`Connected to MongoDB in ${Date.now() - mongoStart}ms`);

    console.log('Fetching session...');
    const sessionStart = Date.now();
    const session = await getServerSession(authOptions);
    console.log(`Fetched session in ${Date.now() - sessionStart}ms`);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    if (Array.isArray(body.entries)) {
      const entriesWithUser = body.entries.map(
        (entry: { name: string; information: string }) => ({
          ...entry,
          userId,
        })
      );
      const operations = entriesWithUser.map(
        (entry: { name: string; information: string; userId: string }) => ({
          updateOne: {
            filter: { name: entry.name, userId: entry.userId },
            update: [
              {
                $set: {
                  information: {
                    $concat: [
                      { $ifNull: ['$information', ''] },
                      {
                        $cond: [
                          {
                            $or: [
                              { $eq: ['$information', null] },
                              { $eq: ['$information', '' ] },
                            ],
                          },
                          '',
                          ', ',
                        ],
                      },
                      entry.information,
                    ],
                  },
                },
              },
            ],
            upsert: true,
          },
        })
      );

      await Contact.bulkWrite(operations);

      return NextResponse.json(
        { message: 'Contacts processed successfully' },
        { status: 201 }
      );
    } else {
      const { name, information } = body;

      if (
        !name ||
        typeof name !== 'string' ||
        !information ||
        typeof information !== 'string'
      ) {
        return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
      }

      let contact = await Contact.findOne({ name, userId });

      if (contact) {
        contact.information = `${contact.information}, ${information}`;
        await contact.save();
      } else {
        contact = new Contact({ name, information, userId });
        await contact.save();
      }

      return NextResponse.json(
        { message: 'Contact processed successfully', contact },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error processing contact(s):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    console.log(`Total time: ${Date.now() - start}ms`);
  }
}

// Handle PUT requests to update a contact for the authenticated user
export async function PUT(req: NextRequest) {
  const start = Date.now();
  try {
    console.log('Connecting to MongoDB...');
    const mongoStart = Date.now();
    await connectMongo();
    console.log(`Connected to MongoDB in ${Date.now() - mongoStart}ms`);

    console.log('Fetching session...');
    const sessionStart = Date.now();
    const session = await getServerSession(authOptions);
    console.log(`Fetched session in ${Date.now() - sessionStart}ms`);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { _id, information } = await req.json();

    if (!_id || typeof _id !== 'string' || !information || typeof information !== 'string') {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const contact = await Contact.findOne({ _id, userId });

    if (!contact) {
      return NextResponse.json({ message: 'Contact not found or not authorized' }, { status: 404 });
    }

    contact.information = information;
    await contact.save();

    return NextResponse.json({ message: 'Contact updated successfully', contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    console.log(`Total time: ${Date.now() - start}ms`);
  }
}

// Handle DELETE requests to remove a contact for the authenticated user
export async function DELETE(req: NextRequest) {
  const start = Date.now();
  try {
    console.log('Connecting to MongoDB...');
    const mongoStart = Date.now();
    await connectMongo();
    console.log(`Connected to MongoDB in ${Date.now() - mongoStart}ms`);

    console.log('Fetching session...');
    const sessionStart = Date.now();
    const session = await getServerSession(authOptions);
    console.log(`Fetched session in ${Date.now() - sessionStart}ms`);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const result = await Contact.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Contact not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    console.log(`Total time: ${Date.now() - start}ms`);
  }
}