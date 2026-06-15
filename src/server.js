// src/server.js

import express from "express";
import NotificationRepositoryInMemory from "./infrastructure/repositories/NotificationRepositoryInMemory.js";
import RedisPublisher from "./infrastructure/messaging/redis/RedisPublisher.js";
import createRoutes from "./interfaces/routes/notificationRoutes.js";
import errorHandler from "./interfaces/middlewares/errorHandler.js";

export function createServer({ repo, publisher } = {}) {
  const app = express();
  app.use(express.json());

  const repository =
    repo ?? new NotificationRepositoryInMemory();

  const eventPublisher =
    publisher ?? new RedisPublisher();

  app.use("/notifications", createRoutes(repository, eventPublisher));

  app.use(errorHandler);

  return { app };
}