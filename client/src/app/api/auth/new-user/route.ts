import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's information
    const user = await currentUser();
    if (!user) {
      return new NextResponse('User not exist', { status: 404 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.emailAddresses[0].emailAddress ?? '',
        },
      });
    }

    return NextResponse.json(dbUser, { status: 201 });
  } catch (error) {
    console.error('Error during user creation or retrieval:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
