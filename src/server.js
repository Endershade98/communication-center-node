import express from 'express';
import { prisma } from './infrastructure/database/prismaClient.js';
import RedisPublisher from './infrastructure/messaging/redis/RedisQueue.js';
import NotificationRepositoryMySQL from './infrastructure/repositories/NotificationRepositoryMySQL.js';
import createRoutes from './interfaces/routes/notificationRoutes.js';

const app = express();
app.use(express.json());

// setup repository e publisher
const repo = new NotificationRepositoryMySQL(prisma);
const publisher = new RedisPublisher();

// monta le routes
createRoutes(app, { repo, publisher });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));