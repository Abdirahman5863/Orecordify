import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';

export async function POST() {
  try {
    // Fetch current user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    // Safely extract user information
    const email = user.emailAddresses?.[0]?.emailAddress ?? '';
    if (!email) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    // Check if user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    // Create user if not found
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email,
        },
      });
    }

    // Respond with the user data
    return NextResponse.json(dbUser, { status: 201 });
  } catch (error) {
    console.error('Error during user creation or retrieval:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
