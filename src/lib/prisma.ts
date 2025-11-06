// src/lib/prisma.ts
import { PrismaClient } from '@/generated/prisma'; // Or '@prisma/client'

// Add PrismaClientOptions if needed (e.g., logging)
// const prismaOptions: Prisma.PrismaClientOptions = { log: ['query'] };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(/* prismaOptions */);
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Avoid creating multiple instances in development
  // See: https://pris.ly/d/help/next-js-best-practices
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient(/* prismaOptions */);
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;