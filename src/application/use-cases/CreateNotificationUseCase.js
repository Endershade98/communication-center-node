// src/application/use-cases/CreateNotificationUseCase.js
import Notification from "../../domain/entities/Notification.js";
import NotificationCreated from "../../domain/events/NotificationCreated.js";

export default class CreateNotificationUseCase {

  constructor(notificationRepository, eventPublisher) {
    this.notificationRepository = notificationRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(data) {

    const notification = new Notification(data);

    await this.notificationRepository.save(notification);

    const event = new NotificationCreated({
      id: notification.id,
      recipient: notification.recipient,
      message: notification.message,
      channel: notification.channel,
      priority: notification.priority,
      createdAt: notification.createdAt
    });

    await this.eventPublisher.publish(
      "notification.created",
      event.toJSON()
    );

    return notification;
  }

}