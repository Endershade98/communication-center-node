// src/application/services/NotificationApplicationService.js
import RedisPublisher from "../../infrastructure/messaging/redis/RedisPublisher.js";

const redisPublisher = new RedisPublisher();

export class NotificationApplicationService {
  async notify(notification) {
    // salva su DB con repository
    await repo.save(notification);

    // pubblica l’evento su Redis
    await redisPublisher.publish("notifications", {
      id: notification.id,
      status: notification.status,
    });
  }
}