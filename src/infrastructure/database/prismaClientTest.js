// src/infrastructure/database/prismaClientTest.js
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Carica la variabile d'ambiente del test prima di creare PrismaClient
config({ path: ".env.test" });

export const prismaTest = new PrismaClient();