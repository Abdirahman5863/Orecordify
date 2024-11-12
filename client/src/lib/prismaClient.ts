import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as typeof global & { prisma?: PrismaClient }

// Use existing Prisma client in development or create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Log settings for detailed debugging
})

// Assign Prisma client to global in development mode only
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
