// src/infrastructure/mappers/NotificationMapper.js

import Notification from "../../domain/entities/Notification.js";
import NotificationStatus from "../../domain/value-objects/NotificationStatus.js";
import Channel from "../../domain/value-objects/Channel.js";
import Priority from "../../domain/value-objects/Priority.js";

export default class NotificationMapper {
  static toPersistence(notification) {
    return {
      id: notification.id,
      recipient: notification.recipient,
      message: notification.message,
      channel: notification.channel.value,
      priority: notification.priority.value,
      status: notification.status.value,
      createdAt: notification.createdAt,
      sentAt: notification.sentAt,
      failedAt: notification.failedAt,
      retryCount: notification.retryCount,
      lastError: notification.lastError,
    };
  }

  static toDomain(record) {
    if (!record) return null;

    return new Notification({
      id: record.id,
      recipient: record.recipient,
      message: record.message,
      channel: new Channel(record.channel),
      priority: new Priority(record.priority),
      status: new NotificationStatus(record.status),
      createdAt: record.createdAt,
      sentAt: record.sentAt,
      failedAt: record.failedAt,
      retryCount: record.retryCount,
      lastError: record.lastError,
    });
  }

  static toDomainList(records) {
    if (!Array.isArray(records)) return [];
    return records.map(r => this.toDomain(r)).filter(Boolean);
  }
}