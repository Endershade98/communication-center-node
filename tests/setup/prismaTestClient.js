// tests/setup/prismaTestClient.js

import { PrismaClient } from "@prisma/client";

export const prismaTest = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});