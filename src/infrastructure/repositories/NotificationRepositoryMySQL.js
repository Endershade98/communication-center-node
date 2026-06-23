// src/infrastructure/repositories/NotificationRepositoryMySQL.js

import NotificationMapper from "../mappers/NotificationMapper.js";

export default class NotificationRepositoryMySQL {

  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async save(notification) {
    const data = NotificationMapper.toPersistence(notification);

    const result = await this.prisma.notification.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });

    return NotificationMapper.toDomain(result);
  }

  async findById(id) {
    const record = await this.prisma.notification.findUnique({
      where: { id }
    });

    return NotificationMapper.toDomain(record);
  }

  async findByRecipient(recipient) {
    const records = await this.prisma.notification.findMany({
      where: { recipient }
    });

    return NotificationMapper.toDomainList(records);
  }

  async findFailedNotifications() {
    const records = await this.prisma.notification.findMany({
      where: { status: "FAILED" }
    });

    return NotificationMapper.toDomainList(records);
  }

  async findProcessingNotifications(){

    const records =
    await this.prisma.notification.findMany({
      where:{
        status:"PROCESSING"
      }
    });


    return NotificationMapper.toDomainList(
      records
    );

    }

  async update(notification) {
    return this.save(notification);
  }
}