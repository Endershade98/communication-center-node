// src/application/use-cases/GetNotificationByIdUseCase.js

export default class GetNotificationByIdUseCase {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("id is required");
    }

    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  }
}