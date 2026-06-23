// src/domain/repositories/NotificationRepository.js

export default class NotificationRepository {

  constructor() {

    if (
      new.target ===
      NotificationRepository
    ) {
      throw new Error(
        "Cannot instantiate abstract class"
      );
    }

  }

  async save() {
    throw new Error(
      "save() not implemented"
    );
  }

  async update() {
    throw new Error(
      "update() not implemented"
    );
  }

  async findById() {
    throw new Error(
      "findById() not implemented"
    );
  }

  async findByRecipient() {
    throw new Error(
      "findByRecipient() not implemented"
    );
  }

  async findFailedNotifications() {
    throw new Error(
      "findFailedNotifications() not implemented"
    );
  }


  async findProcessingNotifications() {
    throw new Error(
      "findProcessingNotifications() not implemented"
    );
  }

}