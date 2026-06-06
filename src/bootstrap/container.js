// src/bootstrap/container.js

import { prisma } from "../infrastructure/database/prismaClient.js";

// Repositories
import NotificationRepositoryMySQL from "../infrastructure/repositories/NotificationRepositoryMySQL.js";

// Messaging
import RedisPublisher from "../infrastructure/messaging/redis/RedisPublisher.js";

// Use Cases
import CreateNotificationUseCase from "../application/use-cases/CreateNotificationUseCase.js";

/**
 * Composition Root
 * Qui costruiamo TUTTE le dipendenze
 */
export function createContainer() {

  // =========================
  // INFRASTRUCTURE
  // =========================

  const notificationRepository = new NotificationRepositoryMySQL(prisma);

  const eventPublisher = new RedisPublisher();

  // =========================
  // USE CASES
  // =========================

  const createNotificationUseCase =
    new CreateNotificationUseCase(notificationRepository, eventPublisher);

  // =========================
  // EXPORT SERVICES
  // =========================

  return {
    notificationRepository,
    eventPublisher,
    createNotificationUseCase,
  };
}