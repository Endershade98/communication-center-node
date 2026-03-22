// src/infrastructure/repositories/NotificationRepositoryInMemory.js

import NotificationRepository from "../../domain/repositories/NotificationRepository.js";

export default class NotificationRepositoryInMemory extends NotificationRepository {

  constructor() {
    super();
    this.notifications = new Map();
  }

  async save(notification) {
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async update(notification) {
    if (!this.notifications.has(notification.id)) {
      throw new Error("Notification not found");
    }

    this.notifications.set(notification.id, notification);
    return notification;
  }

  async findById(id) {
    return this.notifications.get(id) || null;
  }

  async findByRecipient(recipient) {
    return Array.from(this.notifications.values())
      .filter(n => n.recipient === recipient);
  }

}