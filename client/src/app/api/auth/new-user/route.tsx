import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient'; // Update this path based on your project structure

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get Clerk's current user information
  const user = await currentUser();
  
  if (!user) {
    return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
  }

  // Look for user in your database
  let dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  // If the user is not found, create it in the database
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
      },
    });
  }

  // Return the found or created user data as the response
  return NextResponse.json(dbUser);
}
