import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { getAuth } from "@clerk/nextjs/server";

// interface NoteData {
//   title: string;
//   content: string;
//   type: string;
//   priority: string;
//   customerId?: string;
//   orderId?: string;
//   inventoryId?: string;
// }

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notes= await prisma.note.findMany({
      where: {
        userId: user.id,
      },
  
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
 

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { title, content, type, priority, customerId, orderId, inventoryId } = await request.json();
    const newNote = await prisma.note.create({
      data: {
        
       
        title,
        content,
        type,
        priority,
        customerId,
        orderId,
        inventoryId,
        
        status: 'active',
        userId: user.id,

      },
   
      
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    // First check if the note exists and belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
    }

    const updatedNote = await prisma.note.update({
      where: { id: existingNote.id },
      data: updateData,
      include: {
        customer: true,
        order: true,
        inventory: true,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    // First check if the note exists and belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 });
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}