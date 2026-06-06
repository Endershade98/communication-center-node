// src/application/use-cases/CreateNotificationUseCase.js

import { randomUUID } from "crypto";
import Notification from "../../domain/entities/Notification.js";

export default class CreateNotificationUseCase {

  constructor(notificationRepository, eventPublisher) {
    this.notificationRepository = notificationRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute({ recipient, message, channel, priority }) {

    const notification = Notification.create({
      id: randomUUID(),
      recipient,
      message,
      channel,
      priority,
    });

    await this.notificationRepository.save(notification);

    await this.eventPublisher.publish("notification.created", {
      id: notification.id,
      recipient: notification.recipient,
      message: notification.message,
      channel: notification.channel.value,
      priority: notification.priority.value,
    });

    return notification;
  }
}