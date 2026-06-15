// src/application/dto/NotificationResponseDTO.js

export default class NotificationResponseDTO {
  constructor(notification) {
    this.id = notification.id;
    this.recipient = notification.recipient;
    this.message = notification.message;
    this.channel = notification.channel.value;
    this.priority = notification.priority.value;
    this.status = notification.status.value;
    this.createdAt = notification.createdAt;
    this.sentAt = notification.sentAt;
    this.failedAt = notification.failedAt;
  }

  static fromDomain(notification) {
    if (!notification) return null;
    return new NotificationResponseDTO(notification);
  }
}