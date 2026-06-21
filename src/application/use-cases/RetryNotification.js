// src/application/use-cases/RetryNotification.js

import DomainEventDispatcher
from "../services/DomainEventDispatcher.js";

export default class RetryNotification {

  constructor(
    notificationRepository,
    eventPublisher
  ) {

    this.notificationRepository =
      notificationRepository;

    this.dispatcher =
      new DomainEventDispatcher(
        eventPublisher
      );

  }

  async execute(id) {

    if (!id) {
      throw new Error("id is required");
    }

    const notification =
      await this.notificationRepository
        .findById(id);

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    const updated =
      notification.retry();

    await this.notificationRepository
      .update(updated);

    await this.dispatcher.dispatch(
      updated.domainEvents
    );

    updated.clearEvents();

    return updated;
  }

}