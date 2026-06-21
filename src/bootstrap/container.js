// src/bootstrap/container.js

import { prisma }
from "../infrastructure/database/prismaClient.js";

import NotificationRepositoryMySQL
from "../infrastructure/repositories/NotificationRepositoryMySQL.js";

import NotificationRepositoryInMemory
from "../infrastructure/repositories/NotificationRepositoryInMemory.js";

import RedisStreamPublisher
from "../infrastructure/messaging/redis/RedisStreamPublisher.js";

export function createContainer() {

  const isTest =
    process.env.NODE_ENV === "test";

  const notificationRepository =
    isTest
      ? new NotificationRepositoryInMemory()
      : new NotificationRepositoryMySQL(prisma);

  const eventPublisher =
    new RedisStreamPublisher();

  return {
    notificationRepository,
    eventPublisher,
  };

}