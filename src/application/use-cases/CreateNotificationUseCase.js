// src/application/use-cases/CreateNotificationUseCase.js

import { randomUUID } from "crypto";
import Notification from "../../domain/entities/Notification.js";
import DomainEventDispatcher from "../services/DomainEventDispatcher.js";

export default class CreateNotificationUseCase {
  constructor(notificationRepository, eventPublisher) {
    this.notificationRepository = notificationRepository;
    this.dispatcher = new DomainEventDispatcher(eventPublisher);
  }

  async execute(dto) {
    const notification = Notification.create({
      id: randomUUID(),
      recipient: dto.recipient,
      message: dto.message,
      channel: dto.channel,
      priority: dto.priority,
    });

    await this.notificationRepository.save(notification);

    await this.dispatcher.dispatch(notification.domainEvents);

    notification.clearEvents();

    return notification;
  }
}