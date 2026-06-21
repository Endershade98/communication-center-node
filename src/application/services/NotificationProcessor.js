// src/application/services/NotificationProcessor.js

import NotificationDomainService
from "../../domain/services/NotificationDomainService.js";

export default class NotificationProcessor {

  constructor(
    repository,
    providerFactory
  ) {

    this.repository =
      repository;

    this.providerFactory =
      providerFactory;

    this.domainService =
      new NotificationDomainService();

  }

  async process(notificationId) {

    let notification =
      await this.repository.findById(
        notificationId
      );

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    notification =
      this.domainService.process(
        notification
      );

    await this.repository.update(
      notification
    );

    try {

      const provider =
        this.providerFactory.get(
          notification.channel.value
        );

      await provider.send({
        recipient:
          notification.recipient,

        message:
          notification.message,
      });

      notification =
        this.domainService
          .markAsSent(
            notification
          );

    } catch {

      notification =
        this.domainService
          .markAsFailed(
            notification
          );

    }

    await this.repository.update(
      notification
    );

    return notification;
  }

}