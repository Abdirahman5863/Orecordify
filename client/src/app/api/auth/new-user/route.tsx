import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';

export async function GET() {
  // Retrieve the current user's ID from Clerk authentication
  const { userId } = auth();

  // If the user is not authenticated, return an error response
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get Clerk's current user information
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
  }

  // Look for the user in your database
  let dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If the user is not found, create a new user in the database
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

  // Redirect the signed-in user to the /admin page
  return NextResponse.redirect('https://orecordify-z.vercel.app/admin');
}
