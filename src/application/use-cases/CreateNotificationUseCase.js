import { randomUUID } from "crypto";
import Notification from "../../domain/entities/Notification.js";
import Channel from "../../domain/value-objects/Channel.js";
import Priority from "../../domain/value-objects/Priority.js";
import NotificationStatus from "../../domain/value-objects/NotificationStatus.js";

export default class CreateNotificationUseCase {
  constructor(notificationRepository, eventPublisher) {
    this.notificationRepository = notificationRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute({ recipient, message, channel, priority }) {
    const notification = new Notification({
      id: randomUUID(), // ✅ FIX CRITICO
      recipient,
      message,
      channel: new Channel(channel),
      priority: new Priority(priority),
      status: new NotificationStatus("PENDING"),
      createdAt: new Date(),
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