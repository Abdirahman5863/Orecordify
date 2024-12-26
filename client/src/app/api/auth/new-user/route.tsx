import { NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';


export async function GET() {
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

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
      headers: {
        Location: 'https://www.orecordify.com/api/auth/new-user',
      },
    });
  }
  // Perform your Route Handler's logic with the returned user object

  return new NextResponse(null, {
    status: 302, // 302 Found - temporary redirect
    headers: {
      Location: 'https://www.orecordify.com/admin',
    },
  });

}