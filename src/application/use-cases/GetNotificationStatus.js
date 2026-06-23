// src/application/use-cases/GetNotificationStatus.js

export default class GetNotificationStatus {

  constructor(notificationRepository) {

    this.notificationRepository =
      notificationRepository;

  }

  async execute(id) {

    if (!id) {
      throw new Error("id is required");
    }

    const notification =
      await this.notificationRepository.findById(
        id,
      );

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification.status;

  }

}