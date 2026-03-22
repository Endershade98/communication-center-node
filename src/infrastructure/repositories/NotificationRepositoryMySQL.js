// src/infrastructure/repositories/NotificationRepositoryMySQL.js
import Notification from "../../domain/entities/Notification.js";
import NotificationStatus from "../../domain/value-objects/NotificationStatus.js";

export default class NotificationRepositoryMySQL {
  constructor(prismaClient) {
    if (!prismaClient) throw new Error("PrismaClient instance must be passed");
    this.prisma = prismaClient;
  }

  async save(notification) {
    const data = {
      id: notification.id,
      message: notification.message,
      channel: notification.channel.value,
      priority: notification.priority.value,
      status: notification.status.value,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };

    return this.prisma.notification.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findById(id) {
    const record = await this.prisma.notification.findUnique({ where: { id } });
    if (!record) return null;

    return new Notification({
      id: record.id,
      message: record.message,
      channel: record.channel,
      priority: record.priority,
      status: new NotificationStatus(record.status),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  async findFailedNotifications() {
    const records = await this.prisma.notification.findMany({ where: { status: "FAILED" } });
    return records.map(
      (r) =>
        new Notification({
          id: r.id,
          message: r.message,
          channel: r.channel,
          priority: r.priority,
          status: new NotificationStatus(r.status),
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        })
    );
  }

  async update(notification) {
    return this.save(notification);
  }
}