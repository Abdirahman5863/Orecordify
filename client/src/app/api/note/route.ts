import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, currentUser } from '@clerk/nextjs/server';

// Define the shape of the note data
interface NoteData {
  title: string;
  content: string;
  type: string;
  priority: string;
  customerId?: string;
  orderId?: string;
  inventoryId?: string;
}

// GET route to fetch notes
export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notes = await prisma.note.findMany({
      where: { userId: dbUser.id },
      include: {
        customer: true,
        order: true,
        inventory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}

// POST route to create a new note
export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.emailAddresses[0]?.emailAddress ?? '',
        },
      });
    }

    const body: NoteData = await request.json();
    const { title, content, type, priority, customerId, orderId, inventoryId } = body;

    const newNote = await prisma.note.create({
      data: {
        title, 
        content,
        type,
        priority,
        status: 'active',
        customerId,
        orderId,
        inventoryId,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}

//PUT route to update note details

export async function PUT(request: NextRequest)
 { const { userId } = getAuth(request); if (!userId) 
  { return NextResponse.json({ error: 'Unauthorized' }, 
    { status: 401 }); } 
    try { const { id, ...updateData } = await request.json(); 
    const note = await prisma.note.findUnique({ where: { id }, }); 
    if (!note || note.userId !== userId)
   { return NextResponse.json({ error: 'Note not found or unauthorized' }, 
    { status: 404 }); } const updatedNote = await prisma.note.update({ where: { id },
       data: updateData, }); return NextResponse.json(updatedNote); } catch (error)
        { console.error('Error updating note:', error); 
          return NextResponse.json({ error: 'Error updating note' }, { status: 500 }); } }
// DELETE route to remove a note
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    const note = await prisma.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== dbUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}
