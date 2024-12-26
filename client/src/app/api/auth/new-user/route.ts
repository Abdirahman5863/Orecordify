import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';

export async function GET() {
  try {
    console.log("Authenticating user...");
    const { userId } = await auth();
    if (!userId) {
      console.log("User is not authenticated");
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log("Fetching current user information...");
    const user = await currentUser();
    if (!user) {
      console.log("User does not exist");
      return new NextResponse('User not exist', { status: 404 });
    }

    console.log("Checking if user exists in the database...");
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      console.log("User not found in the database. Creating a new user...");
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.emailAddresses[0].emailAddress ?? '',
        },
      });
    }

    if (!dbUser) {
      console.log("Redirecting to new user creation endpoint...");
      return new NextResponse(null, {
        status: 302, // 302 Found - temporary redirect
        headers: {
          Location: 'https://orecordify1.vercel.app/api/auth/new-user',
        },
      });
    }

    console.log("Redirecting to admin dashboard...");
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
      headers: {
        Location: 'https://orecordify1.vercel.app/admin',
      },
    });

  } catch (error) {
    console.error('Error during user creation or retrieval:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
